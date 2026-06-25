import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import clientPromise from '@/lib/mongodb';

// Helper to escape HTML special characters to prevent HTML/CSS injection in email clients
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request: Request) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return NextResponse.json({ error: 'Invalid JSON request body' }, { status: 400 });
  }

  const { name, email, message } = body;

  try {
    // 1. Extract IP for rate limiting (Security / Anti-Spam)
    // Split by comma to get the true client IP if there are multiple proxies in x-forwarded-for
    const rawIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1';
    const ip = rawIp.split(',')[0].trim();

    // 2. Server-side validation
    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !email.trim() || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    if (!message || !message.trim() || message.trim().length < 10) {
      return NextResponse.json({ error: 'Message must be at least 10 characters long' }, { status: 400 });
    }

    const submissionDate = new Date();
    // Format timestamp in Asia/Kolkata timezone (India)
    const formattedDateTime = submissionDate.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'long',
    });

    let dbSaved = false;
    let dbError = null;
    let db = null;

    // 3. Connect to DB to check rate limits & save submission (Security & Failure Handling)
    try {
      const client = await clientPromise;
      db = client.db('portfolio');

      // Rate limit check: Max 3 submissions per 5 minutes per IP
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      const recentSubmissionCount = await db.collection('contacts').countDocuments({
        ip,
        createdAt: { $gte: fiveMinutesAgo }
      });

      if (recentSubmissionCount >= 3) {
        return NextResponse.json(
          { error: 'Too many submissions. Please try again in 5 minutes.' },
          { status: 429 }
        );
      }

      // Log submission details
      await db.collection('contacts').insertOne({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
        ip,
        createdAt: submissionDate,
        formattedDateTime,
      });
      dbSaved = true;
    } catch (err: any) {
      console.error('Failed to log contact form submission to MongoDB:', err);
      dbError = err?.message || 'Database connection error';
    }

    // 4. Send email notification via Nodemailer
    let emailSent = false;
    let emailError = null;

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

    // Check if email configurations are provided
    if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: SMTP_HOST,
          port: parseInt(SMTP_PORT, 10) || 465,
          secure: SMTP_PORT === '465', // true for 465, false for other ports
          auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
          },
          // Anti-hang timeouts to prevent serverless function freeze (Reliability)
          connectionTimeout: 5000,
          greetingTimeout: 5000,
          socketTimeout: 10000,
        });

        // Sanitize name to prevent header injection (Security)
        const sanitizedName = name.replace(/[\r\n"<>]/g, '').trim();
        const escapedName = escapeHtml(name.trim());
        const escapedEmail = escapeHtml(email.trim());
        const escapedMessage = escapeHtml(message.trim());

        // Email subject & body details
        const mailOptions = {
          from: `"${sanitizedName}" <${SMTP_USER}>`, // From user (sent via the SMTP_USER address)
          to: 'sermarajav.offcl@gmail.com', // Always send to this recipient
          replyTo: email.trim(), // Allows direct reply to submitter
          subject: `New Portfolio Message from ${sanitizedName}`,
          text: `
New message received from your portfolio contact form.

Submitted Details:
------------------------------------------
Name: ${name.trim()}
Email: ${email.trim()}
Message:
${message.trim()}

Metadata:
------------------------------------------
IP Address: ${ip}
Date & Time (IST): ${formattedDateTime}
Submission Timestamp: ${submissionDate.toISOString()}
          `,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
              <h2 style="color: #c50248; border-bottom: 2px solid #c50248; padding-bottom: 10px; margin-top: 0;">New Contact Form Message</h2>
              <p>You have received a new contact submission from your portfolio website.</p>
              
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td>
                  <td style="padding: 8px 0;">${escapedName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                  <td style="padding: 8px 0;"><a href="mailto:${escapedEmail}">${escapedEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">IP Address:</td>
                  <td style="padding: 8px 0;">${escapeHtml(ip)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Date & Time:</td>
                  <td style="padding: 8px 0;">${escapeHtml(formattedDateTime)}</td>
                </tr>
              </table>
              
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; border-left: 4px solid #c50248; margin: 20px 0;">
                <h4 style="margin-top: 0; margin-bottom: 10px;">Message:</h4>
                <p style="white-space: pre-wrap; margin: 0;">${escapedMessage}</p>
              </div>
              
              <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
              <p style="font-size: 11px; color: #999; text-align: center; margin: 0;">
                This message was securely logged to MongoDB and sent via your Next.js API route.
              </p>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        emailSent = true;
      } catch (err: any) {
        console.error('Nodemailer failed to send email notification:', err);
        emailError = err?.message || 'SMTP sending error';
      }
    } else {
      console.warn('Nodemailer not configured. Please supply SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS in environment variables.');
      emailError = 'SMTP environment variables not configured';
    }

    // Determine final status
    // If it saved to DB or sent email, we consider it a success.
    // If database insertion failed but email succeeded, we still return success.
    // If both failed, return a 500 error.
    if (dbSaved || emailSent) {
      return NextResponse.json({
        success: true,
        message: 'Message processed successfully',
        details: {
          dbSaved,
          emailSent,
          dbError: dbSaved ? null : dbError,
          emailError: emailSent ? null : emailError,
        }
      });
    }

    return NextResponse.json(
      {
        error: 'Failed to process message',
        details: {
          dbError,
          emailError,
        }
      },
      { status: 500 }
    );

  } catch (error: any) {
    console.error('Failed to parse request or unexpected error in /api/contact:', error);
    return NextResponse.json(
      { error: 'Invalid request body or server error', details: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}

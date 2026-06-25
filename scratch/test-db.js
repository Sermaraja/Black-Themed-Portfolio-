const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI is not defined in env");
  process.exit(1);
}

console.log("Connecting to:", uri.replace(/:([^@]+)@/, ':****@'));

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db('portfolio');
    const collections = await db.listCollections().toArray();
    console.log("Collections:", collections.map(c => c.name));
    
    const projects = await db.collection('projects').find({}).toArray();
    console.log("Number of projects found:", projects.length);
    console.log("First project:", JSON.stringify(projects[0], null, 2));
  } catch (err) {
    console.error("Error connecting/querying:", err);
  } finally {
    await client.close();
  }
}

run();

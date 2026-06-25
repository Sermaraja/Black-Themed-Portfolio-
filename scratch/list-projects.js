const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('portfolio');
    const projects = await db.collection('projects').find({}).toArray();
    console.log("All projects in DB:");
    projects.forEach((p, i) => {
      console.log(`${i+1}: title="${p.title}", category="${p.category}", label="${p.label}", image="${p.image}"`);
    });
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();

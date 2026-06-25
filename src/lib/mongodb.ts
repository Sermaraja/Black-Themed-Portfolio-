import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
  connectTimeoutMS: 5000,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 30000,
  maxPoolSize: 10,
};

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect().catch((err) => {
      console.error('Initial MongoDB development connection failed, retrying in 1s...', err);
      // Clean up cache on rejection so we try again next time
      delete globalWithMongo._mongoClientPromise;
      throw err;
    });
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, we use a lazy connection with Proxy.
  // This avoids caching a permanently rejected connection promise if the initial connect fails.
  let cachedPromise: Promise<MongoClient> | null = null;

  clientPromise = new Proxy({} as Promise<MongoClient>, {
    get(target, prop) {
      if (!cachedPromise) {
        console.log('Connecting to MongoDB database (production)...');
        const client = new MongoClient(uri, options);
        cachedPromise = client.connect().catch(async (err) => {
          console.error('Initial MongoDB connection failed, retrying in 1 second...', err);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return client.connect().catch((retryErr) => {
            console.error('MongoDB reconnection attempt failed. Clearing connection cache.', retryErr);
            cachedPromise = null; // Clear connection cache on permanent failure
            throw retryErr;
          });
        });
      }

      // Route the property access (e.g. .then, .catch, .finally) to the active promise
      const val = cachedPromise[prop as keyof typeof cachedPromise];
      if (typeof val === 'function') {
        return val.bind(cachedPromise);
      }
      return val;
    },
  });
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

import mongoose from 'mongoose';

const uri = process.env.DB_URI;
const dbName = process.env.DB_NAME;

if (!uri)
  throw new Error(
    'MongoDB connection string not specified under process.env.DB_URI'
  );

let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect(uri, opts).then((client) => {
      return {
        client,
        db: client.db(dbName),
      };
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};

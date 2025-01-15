import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

// in express connect ครั้งเดียวจบ เเต่ใน next เราต้องเรียกมัน ทุกๆ server action หรือ api req
// เพราะ next.js run in serverless environment , serverless function are stateless start up to handle a req and shut sown right after without maintaining a continuous connection to  databases เเต่ละ req ถูก handle independently
// เพื่อ optimize มัน ไม่งั้น จะเกิดการ connection mongodb เยอะเกิน ที่ serverside เราเลย caching our connection

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cached: MongooseConnection = (global as any).mongoose;
// defined cached

// for the first time not has then set to null
if (!cached) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;
  if (!MONGODB_URL) {
    throw new Error("MONGODB_URL is not existed");
  }
  cached.promise = cached.promise || mongoose.connect(MONGODB_URL, { dbName: "Imaginify", bufferCommands: false });
  cached.conn = await cached.promise;

  return cached.conn;
};

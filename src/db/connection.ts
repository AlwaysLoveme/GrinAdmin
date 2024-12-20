import mongoose, { type ConnectOptions, ConnectionStates } from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    promise: Promise<mongoose.Mongoose> | null;
    connect: mongoose.Mongoose | null;
  }; // This must be a `var` and not a `let / const`
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { connect: null, promise: null };
}

async function dbConnect() {
  const readyState = mongoose.connection.readyState;
  // 确保数据库是连接状态
  if (cached.connect && readyState === ConnectionStates.connected) {
    return cached.connect;
  }
  if (!cached.promise || readyState === ConnectionStates.disconnected) {
    const opts: ConnectOptions = {
      dbName: "grinAdmin",
      autoCreate: true,
    };
    mongoose.set("strictQuery", true);
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  try {
    cached.connect = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.connect;
}

export default dbConnect;

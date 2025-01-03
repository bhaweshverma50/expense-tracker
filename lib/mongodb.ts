// // lib/mongodb.ts
// import mongoose from 'mongoose';

// const MONGODB_URI =
//   'mongodb+srv://enclaveAdmin:3zEVz3mYjuoYX0yw@crazyenclave.0aghe.mongodb.net/LMS?retryWrites=true&w=majority';
// console.log('MONGODB_URI:', MONGODB_URI);

// if (!MONGODB_URI) {
//   throw new Error('Please define the MONGODB_URI environment variable inside .env');
// }

// let cached = (global as any).mongoose;

// if (!cached) {
//   cached = (global as any).mongoose = { conn: null, promise: null };
// }

// export async function connectToDatabase() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     };

//     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//       return mongoose;
//     });
//   }

//   try {
//     cached.conn = await cached.promise;
//   } catch (e) {
//     cached.promise = null;
//     throw e;
//   }

//   return cached.conn;
// }

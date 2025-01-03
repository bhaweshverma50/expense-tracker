// // models/Labour.ts
// import mongoose from 'mongoose';

// const LabourSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     dailyRate: { type: Number, required: true },
//     phone: { type: String },
//     joinDate: { type: Date, required: true },
//   },
//   { timestamps: true }
// );

// export const Labour = mongoose.model('Labour', LabourSchema);

// // models/Attendance.ts
// const AttendanceSchema = new mongoose.Schema(
//   {
//     labourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Labour', required: true },
//     date: { type: Date, required: true },
//     present: { type: Boolean, required: true },
//     halfDay: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );

// export const Attendance = mongoose.model('Attendance', AttendanceSchema);

// // models/Payment.ts
// const PaymentSchema = new mongoose.Schema(
//   {
//     labourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Labour', required: true },
//     weekStarting: { type: Date, required: true },
//     weekEnding: { type: Date, required: true },
//     daysWorked: { type: Number, required: true },
//     totalAmount: { type: Number, required: true },
//     paid: { type: Boolean, default: false },
//     paidOn: { type: Date },
//   },
//   { timestamps: true }
// );

// export const Payment = mongoose.model('Payment', PaymentSchema);

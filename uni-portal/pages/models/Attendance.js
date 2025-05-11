import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
  course: { type: String, required: true },
  date: { type: Date, required: true },
  students: [
    {
      studentId: { type: String, required: true },
      status: { type: String, enum: ['Present', 'Absent'], required: true }
    }
  ]
});

export default mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema);

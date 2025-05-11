import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  ID: String,
  Batch: Number,
  Discipline: String,
  Email: String,
  Gender: String,
  Name: String,
  Password: String,
  Picture: String,
  Section: String,
  Status: String,
  DoB: String
});

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);
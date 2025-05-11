import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const client = await clientPromise;
    const db = client.db("UniDB"); 
    const students = db.collection("Students");

    const student = req.body;
    student.Password = await bcrypt.hash(student.Password, 10);

    const result = await students.insertOne(student);
    res.status(200).json({ message: "Student added", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/db';
import { console } from 'inspector';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const db = await connectToDatabase();
  const existingUser = await db.collection('users').findOne({ email });
  console.log(existingUser)
  if (existingUser) {
  console.log("hi")

    return NextResponse.json({ error: 'User already exists', user: existingUser }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await db.collection('users').insertOne({
    email,
    password: hashedPassword,
    created_at: new Date(),
  });

  return NextResponse.json(result, { status: 201 });
}

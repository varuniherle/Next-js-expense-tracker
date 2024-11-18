import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/db';
import jwt from 'jsonwebtoken';
export async function POST(req: Request) {
  const { email, password } = await req.json();

  const db = await connectToDatabase();
  const user = await db.collection('users').findOne({ email });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
  
  const response = NextResponse.json({ message: 'Login successful', token }, { status: 200 });
  response.cookies.set('token', token, {
    httpOnly: true, // Prevent access via JavaScript
    secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
    path: '/', // Cookie accessible across the app
    maxAge: 24 * 60 * 60, // Token expires in 1 day
  });
  return response;
  // return NextResponse.json({ message: 'Login successful', userId: user._id }, { status: 200 });
}

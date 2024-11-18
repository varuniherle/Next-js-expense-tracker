import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/db';
import jwt from 'jsonwebtoken';

import verifyToken from '../../middleware/middleware'


export async function POST(req: Request) {
  try {
    // Parse request body
    const { name, type, amount, description, created_at } = await req.json();

    // Validate and decode the token
    const decoded = verifyToken(req.headers.get('Authorization'));
    const userId = decoded.userId;

    // Set created_at to current date if not provided
    const expenseData = {
      userId,
      name,
      type,
      amount,
      description,
      created_at: created_at ? new Date(created_at) : new Date(),
    };

    // Connect to the database
    const db = await connectToDatabase();

    // Insert the expense record
    const result = await db.collection('expenseList').insertOne(expenseData);

    return NextResponse.json({ message: 'Expense added successfully', result }, { status: 201 });
  } catch (error) {
    // Handle token-related errors
    if (error.message === "No token provided") {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    } else if (error.name === "JsonWebTokenError") {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    } else if (error.name === "TokenExpiredError") {
      return NextResponse.json({ error: "Token expired" }, { status: 401 });
    }

    // Log and return generic server error
    console.error("Error adding expense:", error);
    return NextResponse.json({ error: "Failed to add expense" }, { status: 500 });
  }
}

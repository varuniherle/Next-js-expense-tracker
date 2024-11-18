import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/db';
import verifyToken from '../../middleware/middleware';
import { ErrorMessages } from '../../response/errorMessages';
import { handleError } from '../../response/errorHandler';

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
    return handleError(error);  // Handle errors using the centralized error handler
  }
}

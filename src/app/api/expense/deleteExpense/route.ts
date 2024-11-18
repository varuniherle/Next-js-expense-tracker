import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/db';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import verifyToken from '../../middleware/middleware'
// Utility function for token validation


export async function DELETE(req: Request) {
  try {
    // Parse and validate request body
    const { _id } = await req.json();
    if (!_id || !ObjectId.isValid(_id)) {
      return NextResponse.json({ error: 'Invalid or missing ID' }, { status: 400 });
    }

    // Validate token and extract userId
    const decoded = verifyToken(req.headers.get('Authorization'));
    const userId = decoded.userId;


    // Connect to the database
    const db = await connectToDatabase();
    const collection = db.collection('expenseList');

    // Attempt to delete the record
    const result = await collection.deleteOne({ _id: new ObjectId(_id), userId });

    // If no document was deleted, return 404
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'No record found to delete' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Record deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error during deletion:', error);

    // Handle token-related errors
    if (error.message === "No token provided") {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }
    if (error.message === "Invalid token") {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    if (error.message === "Token expired") {
      return NextResponse.json({ error: "Token expired" }, { status: 401 });
    }

    // Generic server error handling
    return NextResponse.json({ error: 'Server error', details: error.message }, { status: 500 });
  }
}

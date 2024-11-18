import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/db';
import { ObjectId } from 'mongodb';
import verifyToken from '../../middleware/middleware';
import { ErrorMessages } from '../../response/errorMessages';
import { handleError } from '../../response/errorHandler';

export async function DELETE(req: Request) {
  try {
    // Parse and validate request body
    const { _id } = await req.json();
    if (!_id || !ObjectId.isValid(_id)) {
      return NextResponse.json({ error: ErrorMessages.INVALID_ID }, { status: 400 });
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
      return NextResponse.json({ error: ErrorMessages.RECORD_NOT_FOUND }, { status: 404 });
    }

    return NextResponse.json({ message: 'Record deleted successfully' }, { status: 200 });
  } catch (error) {
    return handleError(error);  // Handle errors using the centralized error handler
  }
}

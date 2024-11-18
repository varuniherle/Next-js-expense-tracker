import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/db";
import verifyToken from '../../middleware/middleware';
import { ErrorMessages } from '../../response/errorMessages';
import { handleError } from '../../response/errorHandler';

export async function GET(req: Request) {
  try {
    // Verify the token
    const decoded = verifyToken(req.headers.get("Authorization"));
    const userId = decoded.userId;

    // Connect to the database
    const db = await connectToDatabase();
    const result = await db
      .collection("expenseList")
      .find({ userId }, { projection: { amount: 1, description: 1,created_at:1,type:1 } }) // Fetch only required fields
      .toArray();

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return handleError(error);  // Handle errors using the centralized error handler
  }
}

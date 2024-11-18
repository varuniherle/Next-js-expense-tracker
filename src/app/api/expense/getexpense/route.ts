import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/db";
import jwt from "jsonwebtoken";
import verifyToken from '../../middleware/middleware'



export async function GET(req: Request) {
  try {
    // Verify the token
    const decoded = verifyToken(req.headers.get("Authorization"));
    const userId = decoded.userId;

    // Connect to the database
    const db = await connectToDatabase();
    const result = await db
      .collection("expenseList")
      .find({ userId }, { projection: { amount: 1, description: 1 } }) // Fetch only required fields
      .toArray();

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    // Error handling
    if (error.message === "No token provided") {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    } else if (error.name === "JsonWebTokenError") {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    } else if (error.name === "TokenExpiredError") {
      return NextResponse.json({ error: "Token expired" }, { status: 401 });
    }
    console.error("Error fetching expenses:", error);
    return NextResponse.json({ error: "Failed to fetch expenses" }, { status: 500 });
  }
}

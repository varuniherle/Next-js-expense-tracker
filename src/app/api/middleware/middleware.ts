import jwt from "jsonwebtoken";

export default function verifyToken(authHeader: string | null): { userId: string } {
    if (!authHeader) throw new Error("No token provided");
    const token = authHeader.split(" ")[1];
    if (!token) throw new Error("Invalid token format");
  
    return jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
  }
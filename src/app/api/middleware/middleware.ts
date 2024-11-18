import jwt from 'jsonwebtoken';
import { ErrorMessages } from '../response/errorMessages';

// Updated middleware function to throw errors consistently
export default function verifyToken(authHeader: string | null): { userId: string } {
  if (!authHeader) throw new Error(ErrorMessages.NO_TOKEN_PROVIDED);

  const token = authHeader.split(' ')[1];
  if (!token) throw new Error(ErrorMessages.INVALID_TOKEN);

  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      throw new Error(ErrorMessages.INVALID_TOKEN);
    }
    if (error.name === "TokenExpiredError") {
      throw new Error(ErrorMessages.TOKEN_EXPIRED);
    }
    throw error; // If it's another error, pass it to the global error handler
  }
}

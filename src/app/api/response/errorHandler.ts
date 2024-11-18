// errorHandler.ts
import { NextResponse } from 'next/server';
import { ErrorMessages } from './errorMessages';

// Handle common error responses
export function handleError(error: Error) {
  if (error.message === ErrorMessages.NO_TOKEN_PROVIDED) {
    return NextResponse.json({ error: ErrorMessages.NO_TOKEN_PROVIDED }, { status: 401 });
  } else if (error.message === ErrorMessages.INVALID_TOKEN) {
    return NextResponse.json({ error: ErrorMessages.INVALID_TOKEN }, { status: 401 });
  } else if (error.message === ErrorMessages.TOKEN_EXPIRED) {
    return NextResponse.json({ error: ErrorMessages.TOKEN_EXPIRED }, { status: 401 });
  }

  // Generic server error handling
  console.error('Server Error:', error);
  return NextResponse.json({ error: ErrorMessages.SERVER_ERROR, details: error.message }, { status: 500 });
}

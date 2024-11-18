import { NextResponse } from "next/server";
export async function POST() {
    const response = NextResponse.json({ message: 'Logout successful' }, { status: 200 });
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: true,
      path: '/',
      expires: new Date(0),
    });
    return response;
  }
  
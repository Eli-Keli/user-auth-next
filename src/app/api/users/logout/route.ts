/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Next Response
    const response = NextResponse.json({
      message: 'Logout successful',
      success: true,
    });

    // clear the token in the cookie
    response.cookies.set("token", "", {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500});
  }
}
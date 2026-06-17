import { NextRequest, NextResponse } from "next/server";

// POST: Log in and set session cookie
export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (username === "mmiskatul" && password === "Mishkat0325@#$") {
      const response = NextResponse.json({ success: true, message: "Logged in successfully" });
      
      // Set session cookie
      response.cookies.set("session_token", "miskatul-masabi-session-2026", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });

      return response;
    }

    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  } catch (error) {
    console.error("Auth POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// GET: Check active session
export async function GET(req: NextRequest) {
  const sessionToken = req.cookies.get("session_token")?.value;
  
  if (sessionToken === "miskatul-masabi-session-2026") {
    return NextResponse.json({ authenticated: true });
  }
  
  return NextResponse.json({ authenticated: false }, { status: 401 });
}

// DELETE: Log out and clear session cookie
export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Logged out successfully" });
  response.cookies.delete("session_token");
  return response;
}

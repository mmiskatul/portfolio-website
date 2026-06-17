import { NextResponse } from "next/server";

export async function GET() {
  try {
    const username = "mmiskatul";
    const url = `https://github.com/users/${username}/contributions`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch contributions: ${res.status}`);
    }

    const html = await res.text();
    
    // Find all data-level="0-4" attributes in the calendar cells
    // Match the levels dynamically
    const regex = /data-level="([0-4])"/g;
    const matches = [...html.matchAll(regex)];
    
    if (matches.length === 0) {
      throw new Error("No contribution data cells found in markup");
    }

    const contributionLevels = matches.map((m) => parseInt(m[1]));

    return NextResponse.json({
      success: true,
      username,
      contributions: contributionLevels
    });
  } catch (error: any) {
    console.error("Scrape calendar error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "Failed to fetch contribution data" 
    }, { status: 500 });
  }
}

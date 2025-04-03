import { searchYoutubePlaylist } from "@/services/youtube";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    const playlist = await searchYoutubePlaylist(query);
    return NextResponse.json({ playlist });
  } catch (error) {
    console.error("Error generating YouTube playlist:", error);
    return NextResponse.json(
      { error: "Error generating YouTube playlist" },
      { status: 500 }
    );
  }
}

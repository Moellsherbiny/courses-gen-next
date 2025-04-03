import axios from "axios";

export interface YoutubeVideo {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
}

/**
 * Searches for a YouTube playlist based on a given query and returns the videos in that playlist.
 *
 * @param query The search query for the course playlist.
 * @returns A promise that resolves to an array of YoutubeVideo objects.
 */
export async function searchYoutubePlaylist(
  query: string
): Promise<YoutubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    throw new Error("YOUTUBE_API_KEY is not defined in environment variables.");
  }

  // Step 1: Search for a playlist matching the query.
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${encodeURIComponent(
    query
  )}&type=playlist&part=snippet&maxResults=1`;

  const searchResponse = await axios.get(searchUrl);
  const searchItems = searchResponse.data.items;

  if (!searchItems || searchItems.length === 0) {
    throw new Error("No playlist found for the given query.");
  }

  const playlistId = searchItems[0].id.playlistId;
  if (!playlistId) {
    throw new Error("Playlist ID not found in the search result.");
  }

  // Step 2: Retrieve videos from the found playlist.
  const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&playlistId=${playlistId}&part=snippet&maxResults=50`;
  const playlistResponse = await axios.get(playlistUrl);
  const playlistItems = playlistResponse.data.items;

  // Map the playlist items to a simpler format.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const videos: YoutubeVideo[] = playlistItems.map((item: any) => ({
    videoId: item.snippet.resourceId.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails?.medium?.url || "",
  }));

  return videos;
}

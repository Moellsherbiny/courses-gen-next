export interface ICourse {
  id: string;
  title: string;
  outline: string;
  youtubePlaylist?: string;
  generatedImage?: string;
  generatedContent?: string;
  teacher: {
    id: number;
    name?: string;
    email?: string;
  };
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

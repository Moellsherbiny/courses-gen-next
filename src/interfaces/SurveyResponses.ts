export interface SurveyResponses {
  prefersVideos?: boolean;
  prefersImages?: boolean;
  // Add other known keys if needed.
  
  // This index signature allows additional keys with boolean values.
  [key: string]: boolean | undefined;
}
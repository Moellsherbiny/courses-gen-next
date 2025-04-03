export interface IStudentAnalysis {
  id: number;
  course: {
    id: number;
    title: string;
  };
  student: {
    id: number;
    name?: string;
  };
  analysis: string;
  generatedAt: string; // ISO date string
}

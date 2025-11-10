export interface Assignment {
  id: string | null;
  title: string | null;
  description?: string;
  courseId: string | null;
  courseName?: string | null;
  date: Date | null;
  link?: string;
  status?: "pending" | "submitted" | "graded";
}

export interface Review {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  createdAt: string;
  image: string;
  location: string;
  project?: string;
  source?: string;
  url?: string;
}
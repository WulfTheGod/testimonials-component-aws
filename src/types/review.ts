export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  createdAt: string;
  profilePhotoUrl?: string;
  url?: string;
}
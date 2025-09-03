// TypeScript types for testimonials

export { Review } from '../../types/review';

export interface TestimonialCardProps {
  review: Review;
  isActive: boolean;
  isPreview?: boolean;
  onSelect: () => void;
}

export interface TestimonialsSectionProps {
  reviews?: Review[];
}
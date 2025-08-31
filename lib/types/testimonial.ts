/**
 * TypeScript interfaces for Testimonial System
 * Demonstrates strong typing and data modeling skills
 */

export interface LocalizedText {
  en: string;
  fr: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  content: LocalizedText;
  rating: number; // 1-5 stars
  role?: string;
  location?: string;
  projectId?: string;
  isActive: boolean;
  order?: number;
  source?: 'google' | 'direct' | 'email';
  reviewTime?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TestimonialFormData {
  clientName: string;
  content: LocalizedText;
  rating: number;
  role?: string;
  location?: string;
  projectId?: string;
  isActive?: boolean;
}

export interface TestimonialFilter {
  isActive?: boolean;
  minRating?: number;
  projectId?: string;
  source?: string;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
  total: number;
  page?: number;
  pageSize?: number;
  hasMore?: boolean;
}
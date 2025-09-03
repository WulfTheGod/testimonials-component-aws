import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateText(text: string, maxLines: number = 5): string {
  const words = text.split(' ');
  const maxWords = maxLines * 8;
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '...';
}
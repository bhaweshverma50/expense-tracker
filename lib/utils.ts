import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
}

export function getWeekDates(date: Date = new Date()) {
  const curr = new Date(date);

  // Get the day of the week (0-6, where 0 is Sunday)
  const currentDay = curr.getDay();

  // Calculate the date of the most recent Sunday (start of the week)
  const firstday = new Date(curr);
  firstday.setDate(curr.getDate() - currentDay);

  // Calculate the date of the upcoming Saturday (end of the week)
  const lastday = new Date(firstday);
  lastday.setDate(firstday.getDate() + 6);

  return {
    start: firstday,
    end: lastday,
  };
}

export function formatDateForDB(date: Date): string {
  return date.toISOString().split('T')[0];
}

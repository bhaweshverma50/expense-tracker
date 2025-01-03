// Simulating a database with localStorage
import { Labour, Attendance, Payment } from '@/types';

const STORAGE_KEYS = {
  LABOURS: 'labours',
  ATTENDANCE: 'attendance',
  PAYMENTS: 'payments',
};

export const initializeStorage = () => {
  if (typeof window !== 'undefined') {
    if (!localStorage.getItem(STORAGE_KEYS.LABOURS)) {
      localStorage.setItem(STORAGE_KEYS.LABOURS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ATTENDANCE)) {
      localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PAYMENTS)) {
      localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify([]));
    }
  }
};

initializeStorage();

export const db = {
  // Labour Management
  getLabours: (): Labour[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.LABOURS);
    return data ? JSON.parse(data) : [];
  },

  addLabour: (labour: Omit<Labour, 'id'>): Labour => {
    const labours = db.getLabours();
    const newLabour = { ...labour, id: crypto.randomUUID() };
    localStorage.setItem(STORAGE_KEYS.LABOURS, JSON.stringify([...labours, newLabour]));
    return newLabour;
  },

  updateLabour: (id: string, updates: Partial<Labour>): Labour | null => {
    const labours = db.getLabours();
    const index = labours.findIndex((l) => l.id === id);
    if (index === -1) return null;

    const updatedLabour = { ...labours[index], ...updates };
    labours[index] = updatedLabour;
    localStorage.setItem(STORAGE_KEYS.LABOURS, JSON.stringify(labours));
    return updatedLabour;
  },

  deleteLabour: (id: string): boolean => {
    const labours = db.getLabours();
    const filtered = labours.filter((l) => l.id !== id);
    localStorage.setItem(STORAGE_KEYS.LABOURS, JSON.stringify(filtered));
    return true;
  },

  // Attendance Management
  getAttendance: (startDate?: string, endDate?: string): Attendance[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
    const attendance = data ? JSON.parse(data) : [];

    if (!startDate || !endDate) return attendance;

    const start = new Date(startDate);
    const end = new Date(endDate);

    return attendance.filter((a: Attendance) => {
      const attendanceDate = new Date(a.date);
      return attendanceDate >= start && attendanceDate <= end;
    });
  },

  markAttendance: (attendance: Omit<Attendance, 'id'>): Attendance => {
    const records = db.getAttendance();
    const newRecord = { ...attendance, id: crypto.randomUUID() };
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify([...records, newRecord]));
    return newRecord;
  },

  // Payment Management
  getPayments: (): Payment[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.PAYMENTS);
    return data ? JSON.parse(data) : [];
  },

  addPayment: (payment: Omit<Payment, 'id'>): Payment => {
    const payments = db.getPayments();
    const newPayment = { ...payment, id: crypto.randomUUID() };
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify([...payments, newPayment]));
    return newPayment;
  },

  updatePayment: (id: string, updates: Partial<Payment>): Payment | null => {
    const payments = db.getPayments();
    const index = payments.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const updatedPayment = { ...payments[index], ...updates };
    payments[index] = updatedPayment;
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments));
    return updatedPayment;
  },
};

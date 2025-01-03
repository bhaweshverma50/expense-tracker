export interface Labour {
  id: string;
  name: string;
  dailyRate: number;
  phone?: string;
  joinDate: string;
}

export interface Attendance {
  id: string;
  labourId: string;
  date: string;
  present: boolean;
  halfDay: boolean;
  notes?: string;
}

export interface Payment {
  id: string;
  labourId: string;
  weekStarting: string;
  weekEnding: string;
  daysWorked: number;
  totalAmount: number;
  paid: boolean;
  paidOn?: string;
}
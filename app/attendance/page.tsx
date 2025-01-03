'use client';

import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { AttendanceTable } from '@/components/attendance/attendance-table';
import { Labour } from '@/types';
import { db } from '@/lib/db';
import { toast } from 'sonner';

export default function AttendancePage() {
  const [labours, setLabours] = useState<Labour[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [halfDays, setHalfDays] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const loadData = () => {
      const laboursList = db.getLabours();
      setLabours(laboursList);

      const dateStr = date.toISOString().split('T')[0];
      const attendanceRecords = db.getAttendance(dateStr, dateStr);

      const attendanceMap: Record<string, boolean> = {};
      const halfDayMap: Record<string, boolean> = {};

      attendanceRecords.forEach((record) => {
        attendanceMap[record.labourId] = record.present;
        halfDayMap[record.labourId] = record.halfDay;
      });

      setAttendance(attendanceMap);
      setHalfDays(halfDayMap);
    };

    loadData();
  }, [date]);

  const handleAttendanceChange = (labourId: string, present: boolean) => {
    try {
      const dateStr = date.toISOString().split('T')[0];

      db.markAttendance({
        labourId,
        date: dateStr,
        present,
        halfDay: halfDays[labourId] || false,
      });

      setAttendance((prev) => ({
        ...prev,
        [labourId]: present,
      }));

      toast.success('Attendance marked successfully');
    } catch (error) {
      toast.error('Failed to mark attendance');
    }
  };

  const handleHalfDayChange = (labourId: string, halfDay: boolean) => {
    try {
      const dateStr = date.toISOString().split('T')[0];

      db.markAttendance({
        labourId,
        date: dateStr,
        present: attendance[labourId] || false,
        halfDay,
      });

      setHalfDays((prev) => ({
        ...prev,
        [labourId]: halfDay,
      }));

      toast.success('Half day marked successfully');
    } catch (error) {
      toast.error('Failed to mark half day');
    }
  };

  const formatSelectedDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="w-full px-4 sm:container sm:mx-auto py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">Attendance</h1>

      <div className="flex flex-col lg:grid lg:grid-cols-[300px,1fr] gap-4 sm:gap-8">
        <div className="space-y-4">
          <div className="bg-card rounded-lg md:p2">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              className="rounded-md border w-full"
            />
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-sm sm:text-base">
            <p className="font-medium">Selected Date:</p>
            <p className="text-muted-foreground">{formatSelectedDate(date)}</p>
          </div>
        </div>

        <div className="bg-card rounded-lg">
          <div className="overflow-hidden">
            <AttendanceTable
              labours={labours}
              attendance={attendance}
              halfDays={halfDays}
              onAttendanceChange={handleAttendanceChange}
              onHalfDayChange={handleHalfDayChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Labour } from '@/types';

interface AttendanceTableProps {
  labours: Labour[];
  attendance: Record<string, boolean>;
  halfDays: Record<string, boolean>;
  onAttendanceChange: (labourId: string, present: boolean) => void;
  onHalfDayChange: (labourId: string, halfDay: boolean) => void;
}

export function AttendanceTable({
  labours,
  attendance,
  halfDays,
  onAttendanceChange,
  onHalfDayChange,
}: AttendanceTableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[120px]">Name</TableHead>
            <TableHead className="w-[100px] text-center">Present</TableHead>
            <TableHead className="w-[100px] text-center">Half Day</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {labours.map((labour) => (
            <TableRow key={labour.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">{labour.name}</TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center">
                  <Checkbox
                    checked={attendance[labour.id] || false}
                    onCheckedChange={(checked) => onAttendanceChange(labour.id, checked as boolean)}
                    className="h-5 w-5"
                  />
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center">
                  <Checkbox
                    checked={halfDays[labour.id] || false}
                    onCheckedChange={(checked) => onHalfDayChange(labour.id, checked as boolean)}
                    disabled={!attendance[labour.id]}
                    className="h-5 w-5"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
          {labours.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                No labours found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

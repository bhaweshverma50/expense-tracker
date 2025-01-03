'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Payment, Labour } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface PaymentListProps {
  payments: (Payment & { labour: Labour })[];
  onMarkPaid: (payment: Payment) => void;
}

export function PaymentList({ payments, onMarkPaid }: PaymentListProps) {
  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    // For mobile, show shorter date format
    if (window.innerWidth < 640) {
      return `${startDate.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
      })} - ${endDate.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
      })}`;
    }

    // For larger screens, show full date
    return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[120px]">Labour</TableHead>
            <TableHead className="min-w-[180px]">Period</TableHead>
            <TableHead className="min-w-[100px]">Days</TableHead>
            <TableHead className="min-w-[120px]">Amount</TableHead>
            <TableHead className="min-w-[100px]">Status</TableHead>
            <TableHead className="text-right min-w-[120px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">{payment.labour.name}</TableCell>
              <TableCell className="whitespace-nowrap">
                {formatDateRange(payment.weekStarting, payment.weekEnding)}
              </TableCell>
              <TableCell>{payment.daysWorked}</TableCell>
              <TableCell className="whitespace-nowrap">{formatCurrency(payment.totalAmount)}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    payment.paid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {payment.paid ? 'Paid' : 'Pending'}
                </span>
              </TableCell>
              <TableCell className="text-right">
                {!payment.paid && (
                  <Button variant="outline" size="sm" onClick={() => onMarkPaid(payment)} className="whitespace-nowrap">
                    Mark as Paid
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
          {payments.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                No payments found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

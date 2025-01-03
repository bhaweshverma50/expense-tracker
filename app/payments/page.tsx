'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PaymentList } from '@/components/payments/payment-list';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Payment, Labour } from '@/types';
import { db } from '@/lib/db';
import { getWeekDates, formatDateForDB, formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';

export default function PaymentsPage() {
  const [payments, setPayments] = useState<(Payment & { labour: Labour })[]>([]);
  const [totalPending, setTotalPending] = useState(0);

  useEffect(() => {
    // initializeStorage();
    loadPayments();
  }, []);

  const loadPayments = () => {
    console.log('Loading payments...');
    const allPayments = db.getPayments();
    console.log('All payments:', allPayments);
    const labours = db.getLabours();

    const paymentsWithLabour = allPayments.map((payment) => ({
      ...payment,
      labour: labours.find((l) => l.id === payment.labourId)!,
    }));

    console.log('Payments with labour:', paymentsWithLabour);
    setPayments(paymentsWithLabour);
    setTotalPending(paymentsWithLabour.filter((p) => !p.paid).reduce((sum, p) => sum + p.totalAmount, 0));
  };

  const generateWeeklyPayments = () => {
    console.log('Generating or refreshing weekly payments...');
    try {
      const { start, end } = getWeekDates(new Date());
      const startDate = formatDateForDB(start);
      const endDate = formatDateForDB(end);

      const existingPayments = db
        .getPayments()
        .filter((payment) => payment.weekStarting === startDate && payment.weekEnding === endDate);

      const labours = db.getLabours();
      const attendance = db.getAttendance(startDate, endDate);

      let refreshed = false;

      labours.forEach((labour) => {
        const labourAttendance = attendance.filter((a) => a.labourId === labour.id && a.present);
        const daysWorked = labourAttendance.reduce((days, record) => days + (record.halfDay ? 0.5 : 1), 0);

        const existingPayment = existingPayments.find((p) => p.labourId === labour.id);

        if (daysWorked > 0) {
          if (existingPayment) {
            if (
              existingPayment.daysWorked !== daysWorked ||
              existingPayment.totalAmount !== labour.dailyRate * daysWorked
            ) {
              db.updatePayment(existingPayment.id, {
                daysWorked,
                totalAmount: labour.dailyRate * daysWorked,
              });
              refreshed = true;
            }
          } else {
            db.addPayment({
              labourId: labour.id,
              weekStarting: startDate,
              weekEnding: endDate,
              daysWorked,
              totalAmount: labour.dailyRate * daysWorked,
              paid: false,
            });
            refreshed = true;
          }
        }
      });

      loadPayments();

      if (existingPayments.length > 0) {
        if (refreshed) {
          toast.success('Current week payments refreshed with updated data.');
        } else {
          toast.info('Current week payments already generated. No updates needed.');
        }
      } else {
        toast.success('Weekly payments generated successfully');
      }
    } catch (error) {
      console.error('Error generating or refreshing payments:', error);
      toast.error('Failed to generate or refresh payments');
    }
  };

  const handleMarkPaid = (payment: Payment) => {
    try {
      db.updatePayment(payment.id, {
        ...payment,
        paid: true,
        paidOn: formatDateForDB(new Date()),
      });
      loadPayments();
      toast.success('Payment marked as paid');
    } catch (error) {
      toast.error('Failed to mark payment as paid');
    }
  };

  return (
    <div className="w-full px-4 sm:container sm:mx-auto py-4 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Payments</h1>
        <Button onClick={generateWeeklyPayments} className="w-full sm:w-auto">
          Generate Weekly Payments
        </Button>
      </div>

      <div className="mb-6 sm:mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm sm:text-base font-medium">Total Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{formatCurrency(totalPending)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-card rounded-lg overflow-hidden">
        <PaymentList payments={payments} onMarkPaid={handleMarkPaid} />
      </div>
    </div>
  );
}

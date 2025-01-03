'use client';

import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { db } from '@/lib/db';
import { Users, Clock, IndianRupee, AlertCircle } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/status-card';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalLabours: 0,
    activeLabours: 0,
    weeklyAttendance: 0,
    pendingPayments: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        setError(null);

        const labours = await db.getLabours();
        const attendance = await db.getAttendance();
        const payments = await db.getPayments();

        // Calculate weekly stats
        const today = new Date();
        const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
        const weekAttendance = attendance.filter((a) => new Date(a.date) >= weekStart && a.present);

        const pendingPayments = payments.filter((p) => !p.paid);

        setStats({
          totalLabours: labours.length,
          activeLabours: labours.length,
          weeklyAttendance: weekAttendance.length,
          pendingPayments: pendingPayments.reduce((acc, curr) => acc + curr.totalAmount, 0),
        });
      } catch (err: any) {
        setError(err.message || 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (error) {
    return (
      <div className="p-4 md:container md:mx-auto md:py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-4 md:container md:mx-auto md:py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatsCard
          title="Total Labours"
          value={stats.totalLabours}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          loading={loading}
        />
        <StatsCard
          title="Active Labours"
          value={stats.activeLabours}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          loading={loading}
        />
        <StatsCard
          title="Weekly Attendance"
          value={stats.weeklyAttendance}
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
          loading={loading}
        />
        <StatsCard
          title="Pending Payments"
          value={`₹${stats.pendingPayments}`}
          icon={<IndianRupee className="h-4 w-4 text-muted-foreground" />}
          loading={loading}
        />
      </div>
    </div>
  );
}

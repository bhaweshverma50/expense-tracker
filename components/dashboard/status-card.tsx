import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export function StatsCard({
  title,
  value,
  icon,
  loading,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  loading?: boolean;
}) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="animate-pulse flex space-x-4">
            <div className="h-8 w-24 bg-gray-200 rounded"></div>
          </div>
        ) : (
          <div className="text-xl md:text-2xl font-bold">{value}</div>
        )}
      </CardContent>
    </Card>
  );
}

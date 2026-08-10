import { Card, CardContent, Typography } from '@mui/material';

interface MetricCardProps {
  label: string;
  value: number;
}

export function MetricCard({ label, value }: MetricCardProps) {
  return (
    <Card elevation={0} sx={{ border: 1, borderColor: 'divider', flex: '1 1 220px' }}>
      <CardContent>
        <Typography color="text.secondary" variant="body2">
          {label}
        </Typography>
        <Typography component="p" sx={{ mt: 1 }} variant="h4">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

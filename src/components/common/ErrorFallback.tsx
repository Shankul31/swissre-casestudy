import { Button, Stack, Typography } from '@mui/material';
import type { FallbackProps } from 'react-error-boundary';
import { APP_COPY } from '../../constants/app.constants';

export function ErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <Stack
      spacing={2}
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}>
      <Typography component="h1" variant="h4">
        {APP_COPY.unexpectedErrorTitle}
      </Typography>
      <Typography>{APP_COPY.unexpectedErrorDescription}</Typography>
      <Button onClick={resetErrorBoundary} variant="contained">
        {APP_COPY.tryAgainLabel}
      </Button>
    </Stack>
  );
}

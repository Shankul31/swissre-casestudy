import { Alert, Snackbar } from '@mui/material';
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { registerToastHandler, type ToastSeverity } from '../../services/toast.service';

interface ToastState {
  message: string;
  severity: ToastSeverity;
}

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => registerToastHandler((message, severity) => setToast({ message, severity })), []);

  const closeToast = useCallback(() => setToast(null), []);

  return (
    <>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={5000}
        onClose={closeToast}
        open={Boolean(toast)}
      >
        <Alert onClose={closeToast} severity={toast?.severity} variant="filled">
          {toast?.message}
        </Alert>
      </Snackbar>
    </>
  );
}

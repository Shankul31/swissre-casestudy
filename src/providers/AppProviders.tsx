import { CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import type { ReactNode } from 'react';
import { ToastProvider } from '../components/common/ToastProvider';
import { store } from '../store/store';
import { appTheme } from '../theme/appTheme';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <ToastProvider>{children}</ToastProvider>
      </ThemeProvider>
    </Provider>
  );
}

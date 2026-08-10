import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './components/common/ErrorFallback.tsx';
import './index.css';
import App from './App.tsx';
import { AppProviders } from './providers/AppProviders.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={console.error}>
      <AppProviders>
        <App />
      </AppProviders>
    </ErrorBoundary>
  </StrictMode>
);

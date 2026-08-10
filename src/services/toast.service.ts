export type ToastSeverity = 'error' | 'info' | 'success' | 'warning';

type ToastHandler = (message: string, severity: ToastSeverity) => void;

let toastHandler: ToastHandler | undefined;

export const registerToastHandler = (handler: ToastHandler) => {
  toastHandler = handler;

  return () => {
    toastHandler = undefined;
  };
};

export const showErrorToast = (message: string) => {
  toastHandler?.(message, 'error');
};

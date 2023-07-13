export type ToastType = 'success' | 'info' | 'error';

export type ToastProviderType = {
  toasts: {
    type: ToastType;
    title: string;
    message: string;
    id: string;
  }[];
  sequence: number;
};

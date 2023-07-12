export type Type = 'success' | 'info' | 'error';

export interface ToastType {
  type: Type;
  title: string;
  message: string;
  id: string;
}

export type ToastType = 'success' | 'info' | 'error';

export type ToasterType = {
  type: ToastType;
  title: string;
  message: string;
  id: string;
}[];

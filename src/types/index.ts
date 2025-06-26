export interface Contact {
  phone: string;
  name: string;
  address: string;
}

export interface Package {
  senderPhone: string;
  receiverPhone: string;
  weight: string;
  date: string;
}

export interface HashEntry {
  index: number;
  key: string;
  value: string;
  hash: number;
  status: 'occupied' | 'empty';
}

export interface TreeNode {
  phone: string;
  x: number;
  y: number;
  color: string;
  children?: TreeNode[];
}

export type ViewType = 'info' | 'debug';

export type NotificationType = 'success' | 'error' | 'info';

export interface NotificationProps {
  message: string;
  type: NotificationType;
  onClose: () => void;
}
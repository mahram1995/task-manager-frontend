export type DevStatus =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'ON_HOLD'
  | 'COMPLETED';

export type Priority =
  | 'LOW'
  | 'NORMAL'
  | 'HIGH'
  | 'CRITICAL';

export type DeliveryStatus =
  | 'PENDING'
  | 'DELIVERED'
  | 'DELAYED';

export interface Task {
  id: number;
  taskName: string;
  description: string;
  client: string;
  createDate: string;
  devStatus: DevStatus;
  createBy: string;
  expectedDeliveryDate: string | null;
  deliveryDate: string | null;
  expectedStartDate: string | null;
  actualStartDate: string | null;
  expectedEndDate: string | null;
  actualEndDate: string | null;
  priority: Priority;
  deliveryStatus: DeliveryStatus;
}

export interface TaskPayload {
  taskName: string;
  description: string;
  client: string;
  devStatus: DevStatus;
  expectedDeliveryDate: string | null;
  deliveryDate: string | null;
  expectedStartDate: string | null;
  actualStartDate: string | null;
  expectedEndDate: string | null;
  actualEndDate: string | null;
  priority: Priority;
  deliveryStatus: DeliveryStatus;
}

export interface Note {
  id: number;
  noteDescription: string;
  noteDate: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}
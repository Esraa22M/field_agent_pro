export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export type TaskStatus = 'Pending' | 'Active' | 'Completed' | 'Break';

export type TaskType =
  | 'Delivery'
  | 'Pickup'
  | 'Navigation'
  | 'Meeting'
  | 'Break';

export interface Shipment {
  order_id: number;
  status: TaskStatus;
  customer_name: string;
  client_company: string;
  delivery_address: string;
  delivery_date: Date;
  end_time?: Date;
  task_type: TaskType;
  location_coordinates: LocationCoordinates;
  notes?: string;
  contact_phone?: string;
}
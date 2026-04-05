
export type TaskStatus = 'Pending' | 'Active' | 'Completed' | 'Break'|null;
export type TaskType = 'Delivery' | 'Pickup' | 'Navigation' | 'Meeting' | 'Break'|null;

export interface Shipment {
  order_id: number;
  status: string | null;
  customer_name: string | null;
  client_company: string | null;
  delivery_address: string | null;
  delivery_date: string | null; 
  end_time: string | null;      
  task_type: string | null;
  latitude: number|null;      
  longitude: number|null; 
  notes: string | null;
  contact_phone: string | null;
  is_deleted: boolean;
}
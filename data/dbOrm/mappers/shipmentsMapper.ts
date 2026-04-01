import { Shipment as APIShipment } from '../../api/mock/types';
import { shipments } from '../schema/shipments';
import { toSQLiteDate, toISOStringSafe } from '../../utils/date.utils';

type ShipmentInsert = typeof shipments.$inferInsert;

export const ShipmentMapper = {
  toSQLite: (apiItem: APIShipment): ShipmentInsert => {
    return {
      order_id: apiItem.order_id,
      status: apiItem.status,
      customer_name: apiItem.customer_name,
      client_company: apiItem.client_company,
      delivery_address: apiItem.delivery_address,

      delivery_date: toSQLiteDate(apiItem.delivery_date),

      end_time: toISOStringSafe(apiItem.end_time),

      task_type: apiItem.task_type,

      latitude: apiItem.location_coordinates.latitude,
      longitude: apiItem.location_coordinates.longitude,

      notes: apiItem.notes ?? '',
      contact_phone: apiItem.contact_phone ?? '',
    };
  },

  toSQLiteList: (apiItems: APIShipment[]): ShipmentInsert[] => {
    return apiItems.map(ShipmentMapper.toSQLite);
  },
};
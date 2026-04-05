import { eq, ne, sql } from 'drizzle-orm';
import { db } from '../client';
import { TaskStatus } from '../../api/mock/types';
import { shipments } from '../schema/shipments';

type ShipmentSelect = typeof shipments.$inferSelect;
type ShipmentInsert = typeof shipments.$inferInsert;

export const ShipmentQueries = {
    async hasData(): Promise<boolean> {
    const result = await db.select().from(shipments).limit(1);
    return result.length > 0;
  },

  getActiveShipments: async (): Promise<ShipmentSelect[]> => {
 await db.update(shipments)
            .set({ is_deleted: 0 }); 
    return await db
      .select()
      .from(shipments)
      .where(ne(shipments.status, 'Completed'))
      .orderBy(shipments.delivery_date);
  },

  updateStatus: async (
    orderId: number,
    newStatus: TaskStatus,
  ): Promise<void> => {
    await db
      .update(shipments)
      .set({ status: newStatus })
      .where(eq(shipments.order_id, orderId));
  },

  softDelete: async (orderId: number): Promise<void> => {
    await db
      .update(shipments)
      .set({ status: 'Completed' , is_deleted:1})
      .where(eq(shipments.order_id, orderId));
  },
async hardDelete(orderId: number) {
  await db
    .delete(shipments)
    .where(eq(shipments.order_id, orderId));
},
  getCalendarMarkers: async (): Promise<
    Pick<ShipmentSelect, 'order_id' | 'delivery_date' | 'status'>[]
  > => {
    return await db
      .select({
        order_id: shipments.order_id,
        delivery_date: shipments.delivery_date,
        status: shipments.status,
      })
      .from(shipments);
  },

  getTasksByDate: async (isoDate: string): Promise<ShipmentSelect[]> => {
    return await db
      .select()
      .from(shipments)
      .where(eq(shipments.delivery_date, isoDate));
  },

  getTaskById: async (
    orderId: number,
  ): Promise<ShipmentSelect | undefined> => {
    const [result] = await db
      .select()
      .from(shipments)
      .where(eq(shipments.order_id, orderId))
      .limit(1);
    return result;
  },

  upsertMany: async (data: ShipmentInsert[]): Promise<void> => {
    await db
      .insert(shipments)
      .values(data)
      .onConflictDoUpdate({
        target: shipments.order_id,
        set: {
          status: sql`excluded.status`,
          customer_name: sql`excluded.customer_name`,
          delivery_address: sql`excluded.delivery_address`,
          latitude: sql`excluded.latitude`,
          longitude: sql`excluded.longitude`,
          notes: sql`excluded.notes`,
          contact_phone: sql`excluded.contact_phone`,
           is_deleted: sql`excluded.is_deleted`,
        },
      });
  },
checkTableExists:  async ( tableName: string)=> {
  const result = await db.get(
    sql`SELECT name FROM sqlite_master WHERE type='table' AND name=${tableName}`
  );
  return !!result;
}
};
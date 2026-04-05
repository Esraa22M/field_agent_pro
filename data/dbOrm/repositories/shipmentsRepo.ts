import shipmentsService from '../../api/mock/shipmentsService';
import { ShipmentMapper } from '../mappers/shipmentsMapper';
import { ShipmentQueries } from '../queries/shipmentsQueries';
import { toSQLiteDate } from '../../utils/date.utils';
export const ShipmentsRepo = {
  syncFromRemote: async (): Promise<{ success: boolean; error?: unknown }> => {
    try {
      const tableExists = await ShipmentQueries.checkTableExists('shipments');

      if (!tableExists) {
        console.log('Table does not exist (migration issue)');
        return { success: false };
      }

      const hasData = await ShipmentQueries.hasData();

      if (hasData) {
        console.log('Data already exists, skip sync');
        return { success: true };
      }

      console.log('First time sync...');

      const apiData = await shipmentsService.getAll();
      const formattedData = ShipmentMapper.toSQLiteList(apiData);

      await ShipmentQueries.upsertMany(formattedData);

      return { success: true };
    } catch (error) {
      console.error('Sync Error in Repository:', error);
      return { success: false, error };
    }
  },

  getAllLocal: async () => {
    return await ShipmentQueries.getActiveShipments();
  },

  getTasksByDate: async (date: string | Date) => {
    const formattedDate = toSQLiteDate(date);

    if (!formattedDate) {
      throw new Error('Invalid date');
    }

    return await ShipmentQueries.getTasksByDate(formattedDate);
  },
  getTaskById: async (taskId: number) => {
    return await ShipmentQueries.getTaskById(taskId);
  },
  markAsDeleted: async (orderId: number) => {
    return await ShipmentQueries.updateStatus(orderId, 'Completed');
  },
};
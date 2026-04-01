import shipmentsService from '../../api/mock/shipmentsService';
import { ShipmentMapper } from '../mappers/shipmentsMapper';
import { ShipmentQueries } from '../queries/shipmentsQueries';
import { toSQLiteDate } from '../../utils/date.utils';
export const ShipmentsRepo = {
  syncFromRemote: async (): Promise<{ success: boolean; error?: any }> => {
    try {
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

  markAsDeleted: async (orderId: number) => {
    return await ShipmentQueries.updateStatus(orderId, 'Completed');
  },
};
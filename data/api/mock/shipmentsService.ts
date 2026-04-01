import axios from 'axios';
import { Shipment } from './types';

const MOCK_API_URL = 'http://10.0.2.2:3001/shipments';
const shipmentsService = {
  getAll: async (): Promise<Shipment[]> => {
    try {
      const res = await axios.get(MOCK_API_URL);
      return res.data.data.map((item: any) => ({
        ...item,
        delivery_date: new Date(item.delivery_date),
        end_time: item.end_time ? new Date(item.end_time) : undefined,
      }));
    } catch (error) {
      console.error('Error fetching shipments:', error);
      throw error;
    }
  },

  getById: async (id: number): Promise<Shipment> => {
    try {
      const res = await axios.get(`${MOCK_API_URL}/${id}`);
      const item = res.data;
      return {
        ...item,
        delivery_date: new Date(item.delivery_date),
        end_time: item.end_time ? new Date(item.end_time) : undefined,
      };
    } catch (error) {
      console.error(`Error fetching shipment ${id}:`, error);
      throw error;
    }
  },

  deleteById: async (id: number): Promise<any> => {
    try {
      const res = await axios.delete(`${MOCK_API_URL}/${id}`);
      return res.data;
    } catch (error) {
      console.error(`Error deleting shipment ${id}:`, error);
      throw error;
    }
  },

  update: async (
    id: number,
    updatedData: Partial<Shipment>,
  ): Promise<Shipment> => {
    try {
      const payload = {
        ...updatedData,
        delivery_date: updatedData.delivery_date
          ? updatedData.delivery_date.toISOString()
          : undefined,
        end_time: updatedData.end_time
          ? updatedData.end_time.toISOString()
          : undefined,
      };

      const res = await axios.patch(`${MOCK_API_URL}/${id}`, payload);
      const item = res.data;

      return {
        ...item,
        delivery_date: new Date(item.delivery_date),
        end_time: item.end_time ? new Date(item.end_time) : undefined,
      };
    } catch (error) {
      console.error(`Error updating shipment ${id}:`, error);
      throw error;
    }
  },

  create: async (newData: Shipment): Promise<Shipment> => {
    try {
      const payload = {
        ...newData,
        delivery_date: newData.delivery_date.toISOString(),
        end_time: newData.end_time ? newData.end_time.toISOString() : undefined,
      };
      const res = await axios.post(MOCK_API_URL, payload);
      const item = res.data;
      return {
        ...item,
        delivery_date: new Date(item.delivery_date),
        end_time: item.end_time ? new Date(item.end_time) : undefined,
      };
    } catch (error) {
      console.error('Error creating shipment:', error);
      throw error;
    }
  },
};

export default shipmentsService;
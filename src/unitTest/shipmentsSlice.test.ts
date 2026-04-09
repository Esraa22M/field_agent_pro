jest.mock('../../data/dbOrm/repositories/shipmentsRepo', () => ({
  ShipmentsRepo: {
    getAllLocal: jest.fn(),
    softDeleteRow: jest.fn(),
  },
}));

import shipmentsReducer, { setShipments } from '../store/slices/shipmentsSlice';
import { Shipment } from '../types/flatShipmentsTyes';
describe('Shipments Redux Slice - Unit Test', () => {
  
  const initialState = {
    list: [],
    loading: false,
    error: null,
  };

  it('Scenario: Mock the initial state, Dispatch a setShipments action, and Assert state updates', () => {
    
    // 1. تحضير بيانات وهمية (Mock Data)
    const mockShipments: Partial<Shipment>[] = [
      {
        order_id: 101,
        customer_name: 'Ahmed Mohamed',
        latitude: 30.0444,
        longitude: 31.2357,
        is_deleted: false,
      },
      {
        order_id: 102,
        customer_name: 'Sara Aly',
        latitude: 24.7136,
        longitude: 46.6753,
        is_deleted: false,
      }
    ];

    
    const action = setShipments(mockShipments as Shipment[]);
    const newState = shipmentsReducer(initialState, action);

    expect(newState.list).toHaveLength(2);
    
    expect(newState.list[0].order_id).toBe(101);
    expect(newState.list[1].customer_name).toBe('Sara Aly');
    
    expect(newState.loading).toBe(false);
    expect(newState.error).toBeNull();
  });
});

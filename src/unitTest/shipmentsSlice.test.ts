import shipmentsReducer, { setShipments } from 
'../store/slices/shipmentsSlice';
import { Shipment } from '../types/flatShipmentsTyes';
describe('Shipments Redux Slice', () => {
  const initialState = {
    list: [],
    loading: false,
    error: null,
  };

  it('should handle setShipments and update the state correctly', () => {
    const mockShipments: Shipment[] = [
      {
        order_id: 1,
        customer_name: 'Test Customer',
        latitude: 30.0,
        longitude: 31.2,
        is_deleted: false,
       
      } as Shipment,
    ];

    const action = setShipments(mockShipments);
    const newState = shipmentsReducer(initialState, action);

    expect(newState.list).toHaveLength(1);
    expect(newState.list[0].order_id).toBe(1);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBeNull();
  });
});

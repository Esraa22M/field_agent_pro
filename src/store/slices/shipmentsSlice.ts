import { createSlice, createAsyncThunk, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { ShipmentsRepo } from '../../../data/dbOrm/repositories/shipmentsRepo';
import { Shipment } from '../../types/flatShipmentsTyes';
import { RootState } from '../index';

interface ShipmentsState {
  list: Shipment[];
  loading: boolean;
  error: string | null;
}

const initialState: ShipmentsState = {
  list: [],
  loading: false,
  error: null,
};

export const loadShipments = createAsyncThunk<Shipment[], void, { rejectValue: string }>(
  'shipments/load',
  async (_, { rejectWithValue }) => {
    try {
      const dbData = await ShipmentsRepo.getAllLocal();
      const mapped = dbData.map(item => ({
        ...item,
        latitude: item.latitude ?? 0,
        longitude: item.longitude ?? 0,
        is_deleted: !!item.is_deleted,
      }));
      return mapped;
    } catch (error) {
      return rejectWithValue(
        "Failed to load shipments: " + (error instanceof Error ? error.message : String(error))
      );
    }
  }
);

export const softDeleteShipment = createAsyncThunk<number, number, { rejectValue: string }>(
  'shipments/softDelete',
  async (orderId: number, { rejectWithValue }) => {
    try {
      await ShipmentsRepo.softDeleteRow(orderId);
      return orderId;
    } catch (error) {
      return rejectWithValue(
        "Failed to delete shipment: " + (error instanceof Error ? error.message : String(error))
      );
    }
  }
);

export const shipmentsSlice = createSlice({
  name: 'shipments',
  initialState,
  reducers: {
    setShipments: (state, action: PayloadAction<Shipment[]>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadShipments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadShipments.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(loadShipments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(softDeleteShipment.fulfilled, (state, action) => {
        const id = action.payload;
        const item = state.list.find(i => i.order_id === id);
        if (item) {
          item.is_deleted = true;
        }
      });
  },
});

export const { setShipments } = shipmentsSlice.actions;

const selectRawShipments = (state: RootState) => state.shipments.list;

export const selectActiveShipments = createSelector(
  [selectRawShipments],
  (list) => list.filter(item => !item.is_deleted)
);

export default shipmentsSlice.reducer;

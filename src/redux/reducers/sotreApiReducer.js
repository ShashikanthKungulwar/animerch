import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const INITIAL_STATE = {
  items: [],
  filters: false,
  data: [],
  renderData: [],
  rangeData: [],
  rangeValue: 25000,
  isLoggedIn: false,
};  

export const fetchAsyncApiData = createAsyncThunk(
  "fetch-items-call",
  async () => {
    try {
      const prom = await axios.get('https://fakestoreapi.com/products');
      return prom;
    } catch (error) {
      throw error;
    }
  }
);

const storeApiSlice = createSlice({
  name: "storeApi-items",
  initialState: INITIAL_STATE,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setRenderData: (state, action) => {
      state.renderData = action.payload;
    },
    setRangeData: (state, action) => {
      state.rangeData = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setRangeValue: (state, action) => {
      state.rangeValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncApiData.fulfilled, (state, action) => {
      state.items = action.payload.data;
      state.data = [...state.items];
      state.renderData = [...state.data];
    });
  },
});

export const storeApiReducer = storeApiSlice.reducer;
export const storeActions = storeApiSlice.actions;
export const storeApiSelector = (state) => state.storeApiReducer;

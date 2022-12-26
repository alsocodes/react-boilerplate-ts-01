import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { FormResult, GetParam } from "../../app/type.d";
import { IFormCabang } from "../../pages/Cabang/Detail";
import HttpCall from "../../utils/HttpCall";

export type CabangData = {
  publicId: string;
  kode: string;
  nama: string;
  alamat: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CabangState = {
  listCabang: CabangData[];
  page: number;
  count: number;
  size: number;
  formResult: FormResult | null;
  loading: boolean;
};

const initialState: CabangState = {
  listCabang: [],
  page: 0,
  size: 0,
  count: 0,
  formResult: null,
  loading: false,
};

export const GetCabang = createAsyncThunk(
  "cabang/getCabang",
  async (params: GetParam) => {
    try {
      const { result } = (await HttpCall.get("/cabang", { params })).data;
      return result;
    } catch (error) {}
  }
);

export const PostCabang = createAsyncThunk(
  "cabang/postCabang",
  async (payload: IFormCabang) => {
    try {
      const { result } = (await HttpCall.post("/cabang", { ...payload })).data;
    } catch (error) {}
  }
);

export const cabangSlice = createSlice({
  name: "appConfig",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetCabang.pending, (state: CabangState) => {
      state.loading = true;
    });
    builder.addCase(GetCabang.fulfilled, (state: CabangState, { payload }) => {
      const { rows, page, size, count } = payload;
      state.loading = false;
      state.listCabang = rows;
      state.page = page;
      state.size = size;
      state.count = count;
    });
  },
});

// Create and export the selector:
export const selectCabang = (state: RootState) => state.cabang;

// It is a convention to export reducer as a default export:
export default cabangSlice.reducer;

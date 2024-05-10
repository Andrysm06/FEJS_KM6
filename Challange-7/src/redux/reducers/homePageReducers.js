import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
};

const homePageSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    fetchData(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action) {
      state.data = action.payload;
      state.loading = false;
      state.totalPages = action.payload.totalPages;
      state.error = null;
    },
    fetchDataError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchData, fetchDataSuccess, fetchDataError } =
  homePageSlice.actions;
export default homePageSlice.reducer;

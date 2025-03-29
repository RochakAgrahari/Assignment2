import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  history: [],
  result: null,
  loading: false,
  error: null,
};

const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    addQueryToHistory(state, action) {
      state.history.unshift(action.payload);
    },
    startProcessing(state) {
      state.loading = true;
      state.error = null;
    },
    setResult(state, action) {
      state.result = action.payload;
      state.loading = false;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setQuery, addQueryToHistory, startProcessing, setResult, setError } = querySlice.actions;
export default querySlice.reducer;
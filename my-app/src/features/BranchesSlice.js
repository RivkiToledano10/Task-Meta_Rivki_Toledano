import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  branches: [],
  status: 'idle',
  error: null,
};

const branchesSlice = createSlice({
  name: 'branches',
  initialState,
  reducers: {
    updateBranches: (state, action) => {
      state.status = 'succeeded';
      state.branches = action.payload;
    },
  },

});

export const { updateBranches } = branchesSlice.actions;

export default branchesSlice.reducer;

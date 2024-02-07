import { configureStore } from '@reduxjs/toolkit';
import branchesReducer from '../features/BranchesSlice.js'; 

export const store = configureStore({
  reducer: {
    branches: branchesReducer
  },
});
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from 'features/auth/authApi';
import { plcApi } from 'features/plc/plcApi';
import plcReducer from 'features/plc/plcSlice'
import authReducer from 'features/auth/authSlice'
export const store = configureStore({
  reducer: {
    auth:authReducer,
    plcs:plcReducer,
    [authApi.reducerPath]:authApi.reducer,
    [plcApi.reducerPath]:plcApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(plcApi.middleware),
});

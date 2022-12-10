import { configureStore } from '@reduxjs/toolkit';
import { authApi } from 'features/auth/authApi';
import counterReducer from 'features/counter/counterSlice';
import { plcApi } from 'features/plc/plcApi';
import authReducer from 'features/auth/authSlice'
import { toolsApi } from 'features/tools/toolsApi';
export const store = configureStore({
  reducer: {
    auth:authReducer,
    [authApi.reducerPath]:authApi.reducer,
    counter: counterReducer,
    [plcApi.reducerPath]:plcApi.reducer,
    [toolsApi.reducerPath]:toolsApi.reducer,
  },
});

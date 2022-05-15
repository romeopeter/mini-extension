import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./authSlice";
import schoolReducer from "./studentBoardSlice";

export const store = configureStore({
    reducer: {
        school: schoolReducer,
        auth: authReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
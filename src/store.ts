import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './reducer';
 
const store = configureStore({
  reducer: postsReducer, 
});

export type RootState = ReturnType<typeof postsReducer>;
export type AppDispatch = typeof store.dispatch

export default store;
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from './authslice';

// Persist configuration for specific slices
const authPersistConfig = {
  key: 'auth',
  storage,
};

// Root reducer (add persisted auth reducer)
const rootReducer = {
  auth: persistReducer(authPersistConfig, authReducer),
};

// Create store with default middleware; disable serializableCheck because of redux-persist
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;

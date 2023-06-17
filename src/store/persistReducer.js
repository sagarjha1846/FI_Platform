import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import authReducer from './features/auth/authSlice';

import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Only persist the auth slice of the store
};

const reducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export default persistedReducer;

// Libraries
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import createSagaMiddleware from 'redux-saga';

// Redux
import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';

// Persistent redux Config
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['globalData'],
};
const DEV_ENV = process.env.NODE_ENV === 'development';

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: DEV_ENV,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false }).prepend(
      sagaMiddleware
    ),
});

const persister = persistStore(store);

sagaMiddleware.run(rootSaga);

export { persister, store };

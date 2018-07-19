import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import thunk from 'redux-thunk';

import rootReducer from '../reducers/Index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'tempOrderIds']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

/** Creating the store for Redux
  * @param {object} initailState is the object that contains the initail states.
  * @returns {object} Return the store object for Redux.
*/
export default function configureStore(initailState) {
  const store = createStore(persistedReducer, initailState, composeEnhancers(applyMiddleware(thunk)));
  const persistor = persistStore(store);
  return { store, persistor };
  // return createStore(rootReducer, initailState, composeEnhancers(applyMiddleware(thunk)));
}

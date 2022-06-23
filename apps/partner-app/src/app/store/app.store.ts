import { useDispatch } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, Store, AnyAction } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { albumReducer } from './album/reducer'
import { AppState } from './app.state';

const rootReducer = combineReducers<AppState>({ album: albumReducer });
const logger = createLogger({});

// const AppStore = createStore(rootReducer, applyMiddleware(thunk));
// // export type AppDispatch = typeof AppStore.dispatch
// // export const useAppDispatch: () => AppDispatch = useDispatch
// export default AppStore;

export default function configureStore(): Store<AppState, AnyAction> {
  // const store = createStore(rootReducer, undefined, composeWithDevTools(applyMiddleware(thunk)));
  // store.subscribe(()=> {
  //   console.log(store.getState());
  // });
  return createStore(rootReducer, undefined, composeWithDevTools(applyMiddleware(thunk,logger)));;
}
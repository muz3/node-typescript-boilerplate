import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { StateType } from 'typesafe-actions';

import { RootActions } from './actions';
import { createRootReducer } from './reducers';

export const history = createBrowserHistory();
export const rootReducer = createRootReducer(history);

// exporting store related type
export type RootState = StateType<typeof rootReducer>;
export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>;
export type ThunkDispatch = ThunkDispatch<RootState, undefined, RootActions>;
export { RootActions };

/**
 * @param initialState state when app is bootstraped
 * @returns store
 */
export function configureStore(initialState = {}) {
  const middlewares = [thunk, routerMiddleware(history)];
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
}

const store = configureStore();

export default store;

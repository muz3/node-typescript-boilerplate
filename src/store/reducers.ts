import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { History } from 'history';

export const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
  });

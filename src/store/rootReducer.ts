import {combineReducers} from 'redux';
import {appReducer as app} from './app/reducer';

export const rootReducer = combineReducers({
  app,
});

export type ApplicationState = ReturnType<typeof rootReducer>

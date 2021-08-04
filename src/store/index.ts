import {
  applyMiddleware,
  createStore,
  Middleware, Store,
} from 'redux';
import {ApplicationState, rootReducer} from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middleware: Middleware[] = [sagaMiddleware];

export const store: Store<ApplicationState> = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);

sagaMiddleware.run(rootSaga);


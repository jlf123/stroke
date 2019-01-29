import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();

export default createStore(
  rootReducer,
  compose(
    applyMiddleware(
      sagaMiddleware
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);

sagaMiddleware.run(rootSaga);
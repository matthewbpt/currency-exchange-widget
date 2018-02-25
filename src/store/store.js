import { createStore, applyMiddleware } from 'redux';
import { reducer } from '../reducers/reducers';
import createSagaMiddleware from 'redux-saga'
import { fetchCurrentRatesSaga } from '../sagas/fetchCurrentRatesSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(fetchCurrentRatesSaga);
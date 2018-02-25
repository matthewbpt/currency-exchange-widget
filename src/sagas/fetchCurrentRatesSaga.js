import { call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { updateRatesAction, showToastAction, refreshAmountsActions } from '../actions/actions';
import { fetchCurrentRates } from '../api/fetchCurrentRates';

function* poll() {
  try {    
    const data = yield call(fetchCurrentRates);
    yield put(updateRatesAction(data));
    yield put(refreshAmountsActions());
  } catch (e) {
    yield put(showToastAction('Failed to fetch latest currency rates'));
  }
  yield call(delay, 10000);
};

export const fetchCurrentRatesSaga = function* watch() {
  while(true) {
    yield call(poll);
  }
};
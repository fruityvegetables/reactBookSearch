import {all} from 'redux-saga/effects';
import authSagas from './Auth';
import entities from './Entities';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    entities(),
  ]);
}

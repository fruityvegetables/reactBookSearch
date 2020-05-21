import {all, call, fork, put, takeLatest} from "redux-saga/effects";
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import {
  SIGNIN_USER_SUCCESS,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE_SERVER,
  SIGNIN_FAILURE_OTHERS,
  SIGNOUT_USER,
} from "constants/ActionTypes";
import { signInUserApiCall } from './apiCalls/Auth';

function* signInAdmin({payload}) {
  try {
    const data = yield call(signInUserApiCall, payload);
    if (data.ResponseMessage === 'Successful') {
      const decoded = jwtDecode(data.Data.Token);
      localStorage.setItem('user', JSON.stringify(decoded.actort));
      localStorage.setItem('token', data.Data.Token);
      localStorage.setItem('refreshToken', data.Data.RefreshToken);
      localStorage.setItem('authTime', moment().unix());
      localStorage.setItem('expiresIn', data.Data.ExpiresIn);
      return yield put({ type: SIGNIN_SUCCESS, payload: {
        user: decoded.actort,
        signInTime: moment().unix()
      } });
    } else if (data.ResponseCode === '02') {
      return yield put({ type: SIGNIN_FAILURE_OTHERS, payload: data.ResponseMessage });
    } else {
      return yield put({ type: SIGNIN_FAILURE_SERVER });
    }
  } catch (error) {
      return null;
  }
}

function* signOut() {
  try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('authTime');
      localStorage.removeItem('expiresIn')
      return yield put({ type: 'LOGOUT_USER' });
  } catch {
      return null;
  }
}

export function* signInUser() {
  yield takeLatest(SIGNIN_USER_SUCCESS, signInAdmin);
}

export function* signOutUser() {
  yield takeLatest(SIGNOUT_USER, signOut);
}

export default function* rootSaga() {
  yield all([fork(signInUser),
    fork(signOutUser),
  ]);
}

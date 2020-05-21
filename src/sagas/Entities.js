import {all, call, fork, put, takeLatest} from "redux-saga/effects";
import { getPaginatedDataApiCall, createDataApiCall, getOneApiCall, updateApiCall, deleteApiCall, getExtraDataApiCall } from './apiCalls/Entities';
import { APICallsWrapper } from './apiCalls';
import {
    GET_PAGINATED_DATA,
    GET_PAGINATED_DATA_SAGA,
    GET_NO_ENTITY,
    CREATE_RESOURCE,
    CREATE_RESOURCE_SAGA,
    CREATE_RESOURCE_SAGA_END,
    CREATE_RESOURCE_SAGA_ERROR,
    GET_ONE_ENTITY,
    GET_ONE_ENTITY_SAGA,
    GET_ONE_ENTITY_SAGA_END,
    UPDATE_RESOURCE,
    UPDATE_RESOURCE_SAGA,
    UPDATE_RESOURCE_SAGA_ERROR,
    UPDATE_RESOURCE_SAGA_GENERAL_ERROR,
    CREATE_RESOURCE_SAGA_CONFIG_ERROR,
    GET_ENTITY_ERROR,
    CREATE_RESOURCE_SAGA_GENERAL,
    DELETE_RESOURCE,
    DELETE_RESOURCE_SAGA,
    GET_EXTRA_DATA_SAGA,
    GET_EXTRA_DATA,
    GET_EXTRA_ENTITY_ERROR,
    LOGOUT_USER_ON_TOKEN_EXPIRY
} from "constants/ActionTypes";

function* getPaginatedData({payload}) {
  try {
    const content = {
      api: getPaginatedDataApiCall,
      data: payload
    }
    const response = yield call(APICallsWrapper, content );
    if (response === 'Refresh token has expired') {
      return yield put({ type: LOGOUT_USER_ON_TOKEN_EXPIRY });
    }
    if (response.data.data.results.length === 0) {
      return yield put({type: GET_NO_ENTITY });
    } else if (response.data.data.results.length > 0) {
      return yield put({ type: GET_PAGINATED_DATA_SAGA, payload: {
        data: response.data.data.results,
        count: response.data.data.count
      } });
    } else {
      return yield put({ type: GET_ENTITY_ERROR });
    }
} catch (error) {
  return yield put({ type: GET_ENTITY_ERROR });
  }
}

function* getExtraData({payload: { extraEntitiesToFetch}}) {
  try {
    let dataArray = {};
    for(let i=0; i<extraEntitiesToFetch.length; i++) {

      const content = {
        api: getExtraDataApiCall,
        data: `${extraEntitiesToFetch[i]}/v1`
      }

      const response = yield call(APICallsWrapper, content);
      if (response === 'Refresh token has expired') {
        return yield put({ type: LOGOUT_USER_ON_TOKEN_EXPIRY });
      }
      if (response.data.data.results.length === 0) {
        dataArray[extraEntitiesToFetch[i]] = `No ${extraEntitiesToFetch[i]} available`
      } else {
        dataArray[extraEntitiesToFetch[i]] = response.data.data.results
      }
    }
    return yield put({ type: GET_EXTRA_DATA_SAGA, payload: dataArray });
} catch (error) {
  return yield put({ type: GET_EXTRA_ENTITY_ERROR });
  }
}

function* createResource({payload}) {
  try {
    const content = {
      api: createDataApiCall,
      data: payload
    }
    const response = yield call(APICallsWrapper, content);
    if (response === 'Refresh token has expired') {
      return yield put({ type: LOGOUT_USER_ON_TOKEN_EXPIRY });
    }
    if (response.status === 201) {
      return (
        yield put({ type: CREATE_RESOURCE_SAGA, payload: response.data.data }),
        yield put({ type: CREATE_RESOURCE_SAGA_END }));
    } else if (response.status === 400) {
      if(response.data.error.config) {
        yield put({ type: CREATE_RESOURCE_SAGA_CONFIG_ERROR, payload: response.data.error.config })
      } else {
        yield put({ type: CREATE_RESOURCE_SAGA_ERROR, payload: response.data.error });
      }
    } else {
      yield put({ type: CREATE_RESOURCE_SAGA_GENERAL });
    }
} catch (error) {
    yield put({ type: CREATE_RESOURCE_SAGA_GENERAL });
  }
}

function* getOneResource({payload}) {
  try {
    const content = {
      api: getOneApiCall,
      data: payload
    }
    const response = yield call(APICallsWrapper, content);
    if (response === 'Refresh token has expired') {
      return yield put({ type: LOGOUT_USER_ON_TOKEN_EXPIRY });
    }

    if(response.status === 200) {
      return (
        yield put({ type: GET_ONE_ENTITY_SAGA, payload: response.data.data }),
        yield put({ type: GET_ONE_ENTITY_SAGA_END }))
    }
  } catch(error) {
    return null;
  }
}

function* updateResource({payload}) {
  try {
    const content = {
      api: updateApiCall,
      data: payload
    }
    const response = yield call(APICallsWrapper, content);
    if (response === 'Refresh token has expired') {
      return yield put({ type: LOGOUT_USER_ON_TOKEN_EXPIRY });
    }

    if (response.status === 200) {
      return yield put({ type: UPDATE_RESOURCE_SAGA, payload: response.data.data });
    } else if (response.status === 400) {
        yield put({ type: UPDATE_RESOURCE_SAGA_ERROR, payload: response.data.error });
    } else {
      yield put({ type: UPDATE_RESOURCE_SAGA_GENERAL_ERROR });
    }
} catch (error) {
    yield put({ type: UPDATE_RESOURCE_SAGA_GENERAL_ERROR });
      }
}

function* deleteResource({payload: { toDelete, baseEntityAPI } }) {
  try {
    const content = {
      api: deleteApiCall,
      data: { toDelete, baseEntityAPI }
    }
    const response = yield call(APICallsWrapper, content);
    if (response === 'Refresh token has expired') {
      return yield put({ type: LOGOUT_USER_ON_TOKEN_EXPIRY });
    }

      return yield put({ type: DELETE_RESOURCE_SAGA, payload: toDelete });
} catch (error) {
    return null;
    }
}

export function* getAll() {
  yield takeLatest(GET_PAGINATED_DATA, getPaginatedData);
}

export function* createOne() {
  yield takeLatest(CREATE_RESOURCE, createResource);
}

export function* getOne() {
  yield takeLatest(GET_ONE_ENTITY, getOneResource);
}

export function* update() {
  yield takeLatest(UPDATE_RESOURCE, updateResource);
}

export function* deleteOne() {
  yield takeLatest(DELETE_RESOURCE, deleteResource)
}

export function* getExtra() {
  yield takeLatest(GET_EXTRA_DATA, getExtraData)
}

export default function* rootSaga() {
  yield all([
    fork(getAll),
    fork(createOne),
    fork(getOne),
    fork(update),
    fork(deleteOne),
    fork(getExtra)
  ]);
}

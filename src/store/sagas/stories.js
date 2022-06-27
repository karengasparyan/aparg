import { takeLatest, call, put } from 'redux-saga/effects';
import {
  LIST_REQUEST,
  LIST_SUCCESS,
} from '../actions/histories';

import Api from '../apis/stories';

function* list(action) {
  try {
    const { data } = yield call(Api.list, action.payload.data);
    yield put({
      type: LIST_SUCCESS,
      payload: { data },
    });
  } catch (e) {
    console.error(e)
  }
}

export default function* watcher() {
  yield takeLatest(LIST_REQUEST, list);
}


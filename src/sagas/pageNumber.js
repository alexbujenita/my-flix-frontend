import { INCREMENT_PAGE, UPDATE_PAGE } from '../actions/incrementPage';
import { call, put, takeLatest } from 'redux-saga/effects';
import API from '../API';

export function* watchForPage() {
  yield takeLatest(INCREMENT_PAGE, updatePage)
}

export function* updatePage(action) {
  yield put({
    type: UPDATE_PAGE,
    pageNumber: action.pageNumber
  });
}
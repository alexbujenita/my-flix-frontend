import { INCREMENT_PAGE, UPDATE_PAGE } from '../actions/incrementPage';
import { put, takeLatest } from 'redux-saga/effects';

export function* watchForPage() {
  yield takeLatest(INCREMENT_PAGE, updatePage)
}

export function* updatePage(action) {
  yield put({
    type: UPDATE_PAGE,
    pageNumber: action.pageNumber
  });
}
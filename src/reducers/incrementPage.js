import { UPDATE_PAGE } from '../actions/incrementPage';

export const pageNumber = (state = 1, action) => {
  if(action.type === UPDATE_PAGE) {
    return action.pageNumber
  }
  return state;
}
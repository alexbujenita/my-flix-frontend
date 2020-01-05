import { ADD_USER_MOVIES } from '../actions/userMovies';

export const userMovies = (state = [], action) => {
  if(action.type === ADD_USER_MOVIES) {
    return action.userMovies;
  }
  return state;
}
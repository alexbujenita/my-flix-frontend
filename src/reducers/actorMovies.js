import { ADD_ACTOR_MOVIES } from '../actions/actorMovies';

export const actorMovies = (state = {}, action) => {
  if(action.type === ADD_ACTOR_MOVIES) {
    const newState = {...state};
    newState[action.actorId] = action.actorMovies
    return newState;
  }
  return state;
}
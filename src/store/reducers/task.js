import createReducer from '../utils/createReducer';
import actionTypes from '../consts/actionTypes';

const helloState = {
  collection: [],
  progress: [],
};

const helloReducer = {};

helloReducer[actionTypes.habit.ADD_HABIT] = (state, { value }) => ({
  ...state,
  collection: [...state.collection, ...value],
});

helloReducer[actionTypes.habit.DELETE_HABIT] = (state, { value }) => {
  let filter = state.collection.filter((data) => data.id !== value.id);
  return {
    ...state,
    collection: filter,
    progress: [...state.progress, value]
  }
};

helloReducer[actionTypes.habit.CLEAR_STATE] = (state) => ({
  ...state,
  collection: [],
  progress: []
});

// helloReducer[actionTypes.habit.DELETE_HABIT] = (state, { row }) => {
//   return {
//     ...state,
    // collection: [...state.collection, ...value],
//   }
// };
// helloReducer[actionTypes.hello.UPDATE_MESSAGE] = (state, { message }) => ({
//   ...state,
//   message,
// });

// helloReducer[actionTypes.hello.TOGGLE_REVERSE] = state => ({
//   ...state,
//   reverse: !state.reverse,
// });

export default createReducer(helloReducer, helloState);

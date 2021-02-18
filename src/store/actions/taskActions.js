import actionTypes from '../consts/actionTypes';

const helloActions = dispatch => ({
  addHabit: (value) => {
    dispatch({ 
      type: actionTypes.habit.ADD_HABIT,
      payload: { value }
    })
  },
  updateRow: (value) => {
    value.status = 'Complete';
    dispatch({ 
      type: actionTypes.habit.DELETE_HABIT,
      payload: { value }
    })
  },
  updateMEssage: (message) => {
    dispatch({
      type: actionTypes.hello.UPDATE_MESSAGE,
      payload: { message },
    });
  },
  toggleReverse: () => {
    dispatch({ type: actionTypes.hello.TOGGLE_REVERSE });
  },
  clearState: () => {
    dispatch({
      type: actionTypes.habit.CLEAR_STATE
    })
  }
});

export default helloActions;
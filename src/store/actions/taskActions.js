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
  deleteFailedTask: (value) => {
    dispatch({ 
      type: actionTypes.habit.FAILED_TASK,
      payload: { value }
    })
  },
  clearState: () => {
    dispatch({
      type: actionTypes.habit.CLEAR_STATE
    })
  }
});

export default helloActions;
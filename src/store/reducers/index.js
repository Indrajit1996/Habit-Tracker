import { combineReducers } from 'redux';
import tasks from './task';

// combine all reducers
const rootReducer = combineReducers({
  tasks
});

export default rootReducer;

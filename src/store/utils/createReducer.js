export default function createReducer(reducers, defaultState) {
  return (state = defaultState, actionObject) => {
    if (Object.prototype.hasOwnProperty.call(reducers, actionObject.type)) {
      return reducers[actionObject.type](state, actionObject.payload);
    }
    return state;
  };
}

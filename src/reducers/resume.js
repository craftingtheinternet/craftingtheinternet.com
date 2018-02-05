const initialState = {
  id: undefined,
  title: undefined,
  abstract: undefined,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SAVE_RESUME_CONTENT':
      return action.payload;
    default:
      return state;
  }
};

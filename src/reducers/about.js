const initialState = {
  id: undefined,
  title: undefined,
  content: undefined,
  seo: undefined,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SAVE_ABOUT_CONTENT':
      return action.payload;
    default:
      return state;
  }
};

const initialState = {
  id: undefined,
  title: undefined,
  abstract: undefined,
  education: {
    additionalNotes: undefined,
    degree: undefined,
    placeOfStudy: undefined,
  },
  workEligibility: [],
  workHistory: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SAVE_RESUME_CONTENT':
      return action.payload;
    default:
      return state;
  }
};

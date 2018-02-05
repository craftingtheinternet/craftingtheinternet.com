const components = {
  ABOUT: 'SelfPortrait',
  RESUME: null,
};

export default (state = 'HOME', action = {}) => (
  components[action.type] !== undefined ? components[action.type] : state
);

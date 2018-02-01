const components = {
  HOME: null,
  ABOUT: 'SelfPortrait',
};

export default (state = 'HOME', action = {}) => (
  components[action.type] !== undefined ? components[action.type] : state
);

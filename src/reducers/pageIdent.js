const components = {
  ABOUT: 'SelfPortrait',
  RESUME: 'Typewriter',
};

export default (state = 'HOME', action = {}) => (
  components[action.type] !== undefined ? components[action.type] : state
);

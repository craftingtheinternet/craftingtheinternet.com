const components = {
  HOME: null,
  ABOUT: 'SelfPortrait',
};

export default (state = 'HOME', action = {}) => components[action.type] || state;

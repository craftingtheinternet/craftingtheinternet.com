export default (state = 'HOME', action = {}) => {
  switch (action.type) {
    case 'HOME':
      return 'Crafting the Internet — Ben Ceglowski';
    case 'ABOUT':
      return 'About — Crafting the Internet';
    default:
      return state;
  }
};

export default (state = 'HOME', action = {}) => {
  switch (action.type) {
    case 'HOME':
      return 'Crafting the Internet — Ben Ceglowski';
    case 'ABOUT':
      return 'Crafting the Internet — Ben Ceglowski';
    default:
      return state;
  }
};

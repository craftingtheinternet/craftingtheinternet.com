export default (state = 'HOME', action = {}) => {
  switch (action.type) {
    case 'HOME':
      return 'Crafting the Internet';
    case 'ABOUT':
      return 'About — Crafting the Internet';
    default:
      return state;
  }
};

import { NOT_FOUND } from 'redux-first-router';

export default (state = 'HOME', action = {}) => {
  switch (action.type) {
    case 'ABOUT':
      return 'Crafting the Internet — Ben Ceglowski';
    case 'RESUME':
      return 'Resume — Crafting the Internet';
    case [NOT_FOUND]:
      return 'Page Not Found';
    default:
      return state;
  }
};

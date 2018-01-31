import { NOT_FOUND } from 'redux-first-router';

export const pages = {
  HOME: 'Home',
  LIST: 'List',
  ABOUT: 'About',
  [NOT_FOUND]: 'NotFound',
};

export default (state = 'HOME', action = {}) => pages[action.type] || state;

import { NOT_FOUND } from 'redux-first-router';

export const pages = {
  ABOUT: 'About',
  RESUME: 'Resume',
  [NOT_FOUND]: 'NotFound',
};

export default (state = 'ABOUT', action = {}) => pages[action.type] || state;

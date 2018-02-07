import { createResponsiveStateReducer } from 'redux-responsive';

export const breakpoint = createResponsiveStateReducer(null, { initialMediaType: 'small' });
export { default as page } from './page';
export { default as title } from './title';
export { default as panelColor } from './panelColor';
export { default as pageIdent } from './pageIdent';
export { default as typeColor } from './typeColor';
export { default as about } from './about';
export { default as resume } from './resume';

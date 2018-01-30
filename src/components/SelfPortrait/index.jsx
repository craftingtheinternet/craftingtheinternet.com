import universal from 'react-universal-component';

const component = (typeof window === 'undefined' ? () => null : universal(() => import('./svg')));

export default component;

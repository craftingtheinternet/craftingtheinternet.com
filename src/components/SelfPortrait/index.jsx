import universal from 'react-universal-component';

const noopComponent = () => null;
const component = typeof window === 'undefined' ? (
  noopComponent
) : (
  universal(() => import('./svg'), {
    loading: noopComponent,
    error: noopComponent,
  })
);

export default component;

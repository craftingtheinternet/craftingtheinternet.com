import aboutThunk from 'routes/About/thunk';

export default {
  HOME: '/',

  ABOUT: {
    path: '/about',
    thunk: aboutThunk,
  },
};

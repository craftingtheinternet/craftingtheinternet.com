import aboutThunk from 'routes/About/thunk';
import resumeThunk from 'routes/Resume/thunk';

export default {
  ABOUT: {
    path: '/',
    thunk: aboutThunk,
  },
  RESUME: {
    path: '/resume',
    thunk: resumeThunk,
  },
};

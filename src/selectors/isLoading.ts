import { createSelector } from 'reselect';

export default createSelector(
  [state => state.location.type, state => state.about.id, state => state.resume.id],
  (type, aboutId, resumeId) => {
    switch (type) {
      case 'ABOUT':
        return !aboutId;
      case 'RESUME':
        return !resumeId;
      default:
        return false;
    }
  },
);

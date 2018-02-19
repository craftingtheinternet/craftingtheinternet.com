import colors from '../manifests/colors.json';

const components = {
  ABOUT: colors.armadillo,
  RESUME: colors.white,
};

export default (state = 'ABOUT', action = {}) => components[action.type] || state;

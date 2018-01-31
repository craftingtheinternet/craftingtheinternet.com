import colors from '../manifests/colors.json';

const components = {
  HOME: colors.white,
  ABOUT: colors.armadillo,
  LIST: colors.armadillo,
};

export default (state = 'HOME', action = {}) => components[action.type] || state;

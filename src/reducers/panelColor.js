import colors from '../manifests/colors.json';

const components = {
  ABOUT: colors.wattle,
  RESUME: colors.fuchsiaBlue,
};

export default (state = 'ABOUT', action = {}) => components[action.type] || state;

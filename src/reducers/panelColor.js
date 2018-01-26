import colors from '../manifests/colors.json';

export default (state = colors.easternBlue, action = {}) => {
  switch (action.type) {
    case 'HOME':
      return colors.easternBlue;
    case 'LIST':
      return colors.wattle;
    default:
      return state;
  }
};

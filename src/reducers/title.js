const capitalize = str =>
  str.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

export default (state = 'RFR Demo', action = {}) => {
  switch (action.type) {
    case 'HOME':
      return 'RFR Boilerplate';
    case 'LIST':
      return `RFR: ${capitalize(action.payload.category)}`;
    default:
      return state;
  }
};

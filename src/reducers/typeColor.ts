import colors from "manifests/colors.json";

export type ActionType = {
  type: string;
};

export type TypeColorsType = {
  [key: string]: string;
};

const typeColors: TypeColorsType = {
  ABOUT: colors.white,
  CONTACT: colors.white,
  RESUME: colors.armadillo
};

export default (state = "ABOUT", action: ActionType) =>
  typeColors[action.type] || state;

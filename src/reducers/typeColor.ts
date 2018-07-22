import colors from "manifests/colors.json";

export type ActionType = {
  type: string;
};

export type TypeColorsType = {
  [key: string]: string;
};

const typeColors: TypeColorsType = {
  ABOUT: colors.armadillo,
  CONTACT: colors.white,
  RESUME: colors.white
};

export default (state = "ABOUT", action: ActionType) =>
  typeColors[action.type] || state;

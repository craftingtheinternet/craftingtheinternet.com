import colors from "manifests/colors.json";

export type ActionType = {
  type: string;
};

export type PanelColorsType = {
  [key: string]: string;
};

const panelColors: PanelColorsType = {
  ABOUT: colors.wattle,
  CONTACT: colors.seaGreen,
  RESUME: colors.fuchsiaBlue
};

export default (state = "ABOUT", action: ActionType) =>
  panelColors[action.type] || state;

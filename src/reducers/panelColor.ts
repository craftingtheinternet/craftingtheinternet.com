import colors from "manifests/colors.json";

export type ActionType = {
  type: string;
};

export type PanelColorsType = {
  [key: string]: string;
};

const panelColors: PanelColorsType = {
  ABOUT: colors.seaGreen,
  CONTACT: colors.fuchsiaBlue,
  RESUME: colors.wattle
};

export default (state = "ABOUT", action: ActionType) =>
  panelColors[action.type] || state;

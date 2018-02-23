import * as colors from "manifests/colors.json";

export type ActionType = {
  type: string;
};

export type PanelColorsType = {
  [key: string]: string;
};

const panelColors: PanelColorsType = {
  ABOUT: colors.wattle,
  RESUME: colors.fuchsiaBlue
};

export default (state = "ABOUT", action: ActionType) =>
  panelColors[action.type] || state;

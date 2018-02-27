import { NOT_FOUND } from "redux-first-router";

export type ActionType = {
  type: string;
};

export type PagesType = {
  [key: string]: string;
};

export const pages: PagesType = {
  ABOUT: "About",
  CONTACT: "Contact",
  RESUME: "Resume",
  [NOT_FOUND]: "NotFound"
};

export default (state = "ABOUT", action: ActionType): string =>
  pages[action.type] || state;

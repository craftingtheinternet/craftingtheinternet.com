import { NOT_FOUND } from "redux-first-router";

export type ActionType = {
  type: string;
};

export default (state = "ABOUT", action: ActionType) => {
  switch (action.type) {
    case "ABOUT":
      return "Crafting the Internet - Engineering as a Service";
    case "CONTACT":
      return "Get in Touch — Crafting the Internet";
    case "RESUME":
      return "Resume — Crafting the Internet";
    case NOT_FOUND:
      return "Page Not Found";
    default:
      return state;
  }
};

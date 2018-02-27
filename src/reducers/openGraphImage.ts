export type ActionType = {
  type: string;
};

export default (state = "ABOUT", action: ActionType) => {
  switch (action.type) {
    case "ABOUT":
      return "/opengraph/about.png";
    case "CONTACT":
      return "/opengraph/contact.png";
    case "RESUME":
      return "/opengraph/resume.png";
    default:
      return state;
  }
};

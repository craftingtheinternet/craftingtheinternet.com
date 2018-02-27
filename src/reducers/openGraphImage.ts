export type ActionType = {
  type: string;
};

export default (state = "ABOUT", action: ActionType) => {
  switch (action.type) {
    case "ABOUT":
      return "about.png";
    case "CONTACT":
      return "contact.png";
    case "RESUME":
      return "resume.png";
    default:
      return state;
  }
};

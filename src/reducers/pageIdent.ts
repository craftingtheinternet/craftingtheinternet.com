export type ActionType = {
  type: string;
};

export type ComponentsType = {
  [key: string]: string;
};

const components: ComponentsType = {
  ABOUT: "SelfPortrait",
  RESUME: "Typewriter"
};

export default (state = "ABOUT", action: ActionType) =>
  components[action.type] !== undefined ? components[action.type] : state;

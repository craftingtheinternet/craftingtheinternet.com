export type StateType = {
  open: boolean;
};

export type ActionType = {
  type: "OPEN" | "CLOSE";
};

const initialState: StateType = {
  open: false
};

export default (state = initialState, action: ActionType) => {
  switch (action.type) {
    case "OPEN":
      return { open: true };
    case "CLOSE":
      return { open: false };
    default:
      return state;
  }
};

import * as t from "io-ts";

export const schema = t.partial({
  hasSubmitted: t.boolean
});

export type StateType = t.TypeOf<typeof schema>;

export type ActionType = {
  type: string;
};

const initialState: StateType = {
  hasSubmitted: false
};

export default (state: StateType = initialState, action: ActionType) => {
  switch (action.type) {
    case "CONTACT_HAS_NOT_SUBMITTED":
      return { ...state, hasSubmitted: false };
    case "CONTACT_HAS_SUBMITTED":
      return { ...state, hasSubmitted: true };
    default:
      return state;
  }
};

import * as t from "io-ts";

export const schema = t.partial({
  content: t.string,
  id: t.string,
  quote: t.string,
  quoteAttribution: t.string,
  seo: t.object,
  title: t.string
});

export type StateType = t.TypeOf<typeof schema>;

export type ActionType = {
  type: string;
  payload: StateType;
};

const initialState: StateType = {
  content: undefined,
  id: undefined,
  quote: undefined,
  quoteAttribution: undefined,
  seo: undefined,
  title: undefined
};

export default (state: StateType = initialState, action: ActionType) => {
  switch (action.type) {
    case "SAVE_ABOUT_CONTENT":
      return action.payload;
    default:
      return state;
  }
};

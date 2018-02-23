import * as fetch from "isomorphic-fetch";
import { Dispatch } from "react-redux";

import { schema, StateType } from "reducers/about";

export interface DispatchArgs {
  type: string;
  payload: StateType;
}

export type GetState = () => {
  about: {
    id?: string;
  };
};

export default async (dispatch: Dispatch<DispatchArgs>, getState: GetState) => {
  if (!getState().about.id) {
    const data = await fetch(`${process.env.CRAFTING_CONTENT}about/en-US.json`);
    const payload = await data.json();
    const content = schema.decode(payload);
    dispatch({ type: "SAVE_ABOUT_CONTENT", payload });
  }
};

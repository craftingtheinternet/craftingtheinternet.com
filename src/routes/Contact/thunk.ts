import * as fetch from "isomorphic-fetch";
import { Dispatch } from "react-redux";

import { schema, StateType } from "reducers/contact";

export interface DispatchArgs {
  type: string;
  payload: StateType;
}

export type GetState = () => {
  contact: {
    id?: string;
  };
};

export default async (dispatch: Dispatch<DispatchArgs>, getState: GetState) => {
  if (!getState().contact.id) {
    const data = await fetch(
      `${process.env.CRAFTING_CONTENT}contact/en-US.json`
    );
    const payload = await data.json();
    const content = schema.decode(payload);
    dispatch({ type: "SAVE_CONTACT_CONTENT", payload });
  }
};

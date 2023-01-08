import fetch from "cross-fetch";
import { Dispatch } from "redux";

import { schema, StateType } from "reducers/contact";

import { unsetSubmitted } from "actions/contactForm";

export interface DispatchArgs {
  type: string;
}

export type GetState = () => {
  contact: {
    id?: string;
  };
};

export default async (dispatch: Dispatch<DispatchArgs>, getState: GetState) => {
  dispatch(unsetSubmitted());
  if (!getState().contact.id) {
    const data = await fetch(
      `${process.env.CRAFTING_CONTENT}contact/en-US.json`
    );
    const payload = await data.json();
    const content = schema.decode(payload);
    dispatch({ type: "SAVE_CONTACT_CONTENT", payload });
  }
};

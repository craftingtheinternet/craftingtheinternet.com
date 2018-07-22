import fetch from "cross-fetch";
import { Dispatch } from "redux";

import { schema, StateType } from "reducers/resume";

export interface DispatchArgs {
  type: string;
  payload: StateType;
}

export type GetState = () => {
  resume: {
    id?: string;
  };
};

export default async (dispatch: Dispatch<DispatchArgs>, getState: GetState) => {
  if (!getState().resume.id) {
    const data = await fetch(
      `${process.env.CRAFTING_CONTENT}resume/en-US.json`
    );
    const payload = await data.json();
    const content = schema.decode(payload);
    dispatch({ type: "SAVE_RESUME_CONTENT", payload });
  }
};

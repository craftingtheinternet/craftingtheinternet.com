import aboutThunk from "routes/About/thunk";
import contactThunk from "routes/Contact/thunk";
import resumeThunk from "routes/Resume/thunk";

import { Dispatch } from "redux";

export interface DispatchArgs {
  type: string;
  payload: any;
}

export interface RoutesMap {
  [key: string]: {
    path: string;
    thunk?: (
      dispatch: Dispatch,
      getState?: () => object
    ) => PromiseLike<void>;
  };
}

const routesMap: RoutesMap = {
  ABOUT: {
    path: "/",
    thunk: aboutThunk
  },
  CONTACT: {
    path: "/contact",
    thunk: contactThunk
  },
  RESUME: {
    path: "/resume",
    thunk: resumeThunk
  }
};

export default routesMap;

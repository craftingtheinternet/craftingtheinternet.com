import aboutThunk from "routes/About/thunk";
import resumeThunk from "routes/Resume/thunk";

import { Dispatch } from "react-redux";

export interface DispatchArgs {
  type: string;
  payload: any;
}

export interface RoutesMap {
  [key: string]: {
    path: string;
    thunk?: (
      dispatch: Dispatch<DispatchArgs>,
      getState?: () => object
    ) => PromiseLike<void>;
  };
}

const routesMap: RoutesMap = {
  ABOUT: {
    path: "/",
    thunk: aboutThunk
  },
  RESUME: {
    path: "/resume",
    thunk: resumeThunk
  }
};

export default routesMap;

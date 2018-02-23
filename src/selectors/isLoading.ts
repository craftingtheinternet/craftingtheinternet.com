import { createSelector, Selector } from "reselect";

export interface ReduxState {
  location: {
    type: string;
  };
  about: {
    id?: string;
  };
  resume: {
    id?: string;
  };
}

export default createSelector(
  [
    (state: ReduxState): string => state.location.type,
    (state: ReduxState): string => state.about.id,
    (state: ReduxState): string => state.resume.id
  ],
  (type: string, aboutId: string, resumeId: string): boolean => {
    switch (type) {
      case "ABOUT":
        return !aboutId;
      case "RESUME":
        return !resumeId;
      default:
        return false;
    }
  }
);

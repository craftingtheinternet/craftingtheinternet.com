import createHistory from "history/createMemoryHistory";
import { NOT_FOUND } from "redux-first-router";

import configureStore from "../src/configureStore";

interface ReqProps {
  path: string;
  [key: string]: any;
}

interface ResProps {
  status: (statusCode: number) => void;
  redirect: (statusCode: number, pathname: string) => void;
  [key: string]: any;
}

type RedirectType = {
  kind: string;
  pathname: string;
};

const doesRedirect = ({ kind, pathname }: RedirectType, res: ResProps) => {
  if (kind === "redirect") {
    res.redirect(302, pathname);
    return true;
  }
  return false;
};

export default async (req: ReqProps, res: ResProps) => {
  const history = createHistory({ initialEntries: [req.path] });
  const { store, thunk } = configureStore(history);

  await thunk(store);

  const { location } = store.getState();
  if (doesRedirect(location, res)) {
    return false;
  }

  const status = location.type === NOT_FOUND ? 404 : 200;
  res.status(status);
  return store;
};

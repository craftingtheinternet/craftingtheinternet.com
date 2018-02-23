import * as React from "react";
import activeHtml from "react-active-html";

import * as styles from "./styles.styl";

export interface Props {
  children: string;
}

const component: React.SFC<Props> = ({ children }) => (
  <div className={styles.content}>{activeHtml(children)}</div>
);

component.displayName = "RichText";

export default component;

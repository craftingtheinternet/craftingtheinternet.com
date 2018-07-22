import * as React from "react";
import activeHtml from "react-active-html";
import Link from "redux-first-router-link";

import * as styles from "./styles.styl";

export interface Props {
  children: string;
}

export interface AnchorProps {
  href: string;
  target: string;
  style: {};
  children: React.ReactChild;
}

const replaceWith = {
  a: (props: Partial<AnchorProps>) => {
    const isExternal = props.href.startsWith("http");
    return isExternal ? (
      <a href={props.href} target={props.target} style={props.style}>
        {props.children}
      </a>
    ) : (
      <Link
        to={props.href.startsWith("/") ? props.href : `/${props.href}`}
        style={{ color: "inherit", ...props.style }}
      >
        {props.children}
      </Link>
    );
  }
};

const component: React.SFC<Props> = ({ children }) => (
  <div className={styles.content}>{activeHtml(children, replaceWith)}</div>
);

component.displayName = "RichText";

export default component;

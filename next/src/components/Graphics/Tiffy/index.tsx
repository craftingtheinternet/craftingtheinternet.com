import * as React from "react";

import { paths, viewBox } from "./svg.json";

import * as styles from "./styles.styl";

export interface Props {
  color?: string;
  isClient?: boolean;
  disableAnimation?: boolean;
}

export interface Path {
  transform?: string;
  d: string;
  className: string;
}

const component: React.SFC<Props> = ({ color, isClient, disableAnimation }) => (
  <svg
    width="100%"
    viewBox={viewBox}
    stroke={color}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {isClient &&
      paths.map(({ d, className, transform }: Path) => (
        <path
          d={d}
          key={className}
          className={[
            styles[className],
            disableAnimation ? styles.disableAnimation : ""
          ].join(" ")}
          transform={transform}
        />
      ))}
  </svg>
);

component.displayName = "Tiffy";
component.defaultProps = {
  color: "black",
  disableAnimation: false,
  isClient: typeof window !== "undefined"
};

export default component;

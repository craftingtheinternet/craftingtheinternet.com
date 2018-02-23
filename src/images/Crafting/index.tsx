import * as React from "react";

import { g, viewBox } from "./svg.json";

import styles from "./styles.styl";

export interface Props {
  color?: string;
  disableAnimation?: boolean;
}

export interface Path {
  transform?: string;
  path: {
    d: string;
    className: string;
  };
}

const component: React.SFC<Props> = ({ color, disableAnimation }) => (
  <svg
    width="100%"
    viewBox={viewBox}
    stroke={color}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {g.map(({ transform, path: { d, className } }: Path) => (
      <g key={className} transform={transform}>
        <path
          d={d}
          className={[
            styles[className],
            disableAnimation ? styles.disableAnimation : ""
          ].join(" ")}
        />
      </g>
    ))}
  </svg>
);

component.displayName = "Crafting";
component.defaultProps = {
  color: "black",
  disableAnimation: false
};

export default component;

import * as React from "react";

import Image from "components/Image";

import styles from "./styles.styl";

export interface Props {
  disableAnimation: boolean;
}

const component: React.SFC<Props> = ({ disableAnimation }) => (
  <div className={[styles.ident, styles.padded].join(" ")}>
    <Image src="Crafting" color="white" disableAnimation={disableAnimation} />
  </div>
);

component.displayName = "BrandIdent";
component.defaultProps = {
  disableAnimation: false
};

export default component;

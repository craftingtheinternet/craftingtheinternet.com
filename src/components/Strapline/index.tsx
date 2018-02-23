import * as React from "react";

import Image from "components/Image";

import * as styles from "./styles.styl";

export interface Props {
  disableAnimation: boolean;
}

const component: React.SFC<Props> = ({ disableAnimation }) => (
  <div className={styles.ident}>
    <div className={styles.strapline}>
      <Image
        src="TheInternet"
        color="white"
        disableAnimation={disableAnimation}
      />
    </div>
  </div>
);

component.displayName = "Strapline";
component.defaultProps = {
  disableAnimation: false
};

export default component;

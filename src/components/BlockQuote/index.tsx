import * as PropTypes from "prop-types";
import * as React from "react";

import * as styles from "./styles.styl";

export interface Props {
  attribution?: string;
  children: string;
}

const component: React.SFC<Props> = ({ children, attribution }) => (
  <blockquote className={styles.blockquote}>
    <p>{children}</p>
    {attribution && <footer>{`— ${attribution}`}</footer>}
  </blockquote>
);

component.displayName = "BlockQuote";
component.defaultProps = {
  attribution: undefined
};
component.propTypes = {
  attribution: PropTypes.string,
  children: PropTypes.string.isRequired
};

export default component;

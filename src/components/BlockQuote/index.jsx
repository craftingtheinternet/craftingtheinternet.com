import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.styl';

const component = ({
  children,
  attribution,
}) => (
  <blockquote className={styles.blockquote}>
    <p>{children}</p>
    {attribution && (
      <footer>{`— ${attribution}`}</footer>
    )}
  </blockquote>
);

component.displayName = 'BlockQuote';
component.defaultProps = {
  attribution: undefined,
};
component.propTypes = {
  children: PropTypes.string.isRequired,
  attribution: PropTypes.string,
};

export default component;

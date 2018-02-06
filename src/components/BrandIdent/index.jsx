import React from 'react';
import PropTypes from 'prop-types';
import Image from 'components/Image';
import styles from './styles.styl';

const component = ({ disableAnimation }) => (
  <div className={[styles.ident, styles.padded].join(' ')}>
    <Image
      src="Crafting"
      color="white"
      disableAnimation={disableAnimation}
    />
  </div>
);

component.displayName = 'BrandIdent';
component.defaultProps = {
  disableAnimation: false,
};
component.propTypes = {
  disableAnimation: PropTypes.bool,
};

export default component;

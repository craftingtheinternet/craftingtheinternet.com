import React from 'react';
import PropTypes from 'prop-types';
import Image from 'components/Image';
import styles from './styles.styl';

const component = ({ disableAnimation }) => (
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

component.displayName = 'Strapline';
component.defaultProps = {
  disableAnimation: false,
};
component.propTypes = {
  disableAnimation: PropTypes.bool,
};

export default component;

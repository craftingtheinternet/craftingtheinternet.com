import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TransitionGroup, Transition } from 'transition-group';
import universal from 'react-universal-component';

import styles from '../../css/Switcher.css';

const UniversalComponent = universal(({ page }) => import(`../${page}`), {
  minDelay: 500,
  loading: () => (
    <div className={styles.spinner}>
      <div />
    </div>
  ),
  error: () => <div className={styles.notFound}>PAGE NOT FOUND - 404</div>,
});

const component = ({
  page,
  category,
  direction,
  isLoading,
}) => (
  <TransitionGroup
    className={`${styles.switcher} ${direction}`}
    duration={500}
    prefix="fade"
  >
    <Transition key={`${page}${category}`}>
      <UniversalComponent page={page} isLoading={isLoading} />
    </Transition>
  </TransitionGroup>
);

component.defaultProps = {
  category: undefined,
  direction: 'next',
  isLoading: false,
};
component.propTypes = {
  page: PropTypes.string.isRequired,
  category: PropTypes.string,
  isLoading: PropTypes.bool,
  direction: PropTypes.oneOf(['back', 'next']),
};

export const mapStateToProps = ({ page, category }) => ({ page, category });

export { component };

export default connect(mapStateToProps)(component);

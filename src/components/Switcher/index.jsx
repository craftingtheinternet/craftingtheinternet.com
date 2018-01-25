import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TransitionGroup, Transition } from 'transition-group';
import universal from 'react-universal-component';

import styles from '../../styl/Switcher.styl';

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
  pathname,
  direction,
  isLoading,
}) => (
  <TransitionGroup
    className={`${styles.switcher} ${direction}`}
    duration={500}
    prefix="fade"
  >
    <Transition key={pathname}>
      <UniversalComponent page={page} isLoading={isLoading} />
    </Transition>
  </TransitionGroup>
);

component.defaultProps = {
  direction: 'next',
  isLoading: false,
};
component.propTypes = {
  page: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  direction: PropTypes.oneOf(['back', 'next']),
};

export const mapStateToProps = ({ page, category, location: { pathname } }) => ({
  page,
  category,
  pathname,
});

export { component };

export default connect(mapStateToProps)(component);

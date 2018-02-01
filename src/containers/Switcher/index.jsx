import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TransitionGroup, Transition } from 'transition-group';
import universal from 'react-universal-component';

import styles from 'containers/Switcher/styles.styl';

const UniversalComponent = universal(({ page }) => import(`routes/${page}`), {
  minDelay: 500,
  loading: () => null,
  error: () => <div>PAGE NOT FOUND - 404</div>,
});

const component = ({
  page,
  pathname,
  isLoading,
}) => (
  <TransitionGroup
    component="div"
    className={styles.switcher}
    duration={500}
    prefix={styles.transition}
  >
    <Transition key={pathname}>
      <UniversalComponent page={page} isLoading={isLoading} />
    </Transition>
  </TransitionGroup>
);

component.defaultProps = {
  isLoading: false,
};
component.propTypes = {
  page: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
};

export const mapStateToProps = ({ page, category, location: { pathname } }) => ({
  page,
  category,
  pathname,
});

export { component };

export default connect(mapStateToProps)(component);

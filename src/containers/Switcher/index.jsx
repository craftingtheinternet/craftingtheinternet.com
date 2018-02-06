import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TransitionGroup, Transition } from 'transition-group';
import universal from 'react-universal-component';

import styles from 'containers/Switcher/styles.styl';

const DURATION = 300;

const UniversalComponent = universal(({ page }) => import(`routes/${page}`), {
  minDelay: 500,
  loading: () => null,
  error: () => <div>PAGE NOT FOUND - 404</div>,
});

const component = ({
  page,
  pathname,
  typeColor,
  isLoading,
}) => (
  <TransitionGroup
    component="div"
    duration={DURATION}
    className={styles.switcher}
    prefix={styles.transition}
  >
    <Transition key={pathname}>
      <UniversalComponent
        page={page}
        isLoading={isLoading}
        typeColor={typeColor}
      />
    </Transition>
  </TransitionGroup>
);

component.defaultProps = {
  typeColor: 'black',
  isLoading: false,
};
component.propTypes = {
  page: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  typeColor: PropTypes.string,
  isLoading: PropTypes.bool,
};

export const mapStateToProps = ({ page, category, location: { pathname } }) => ({
  page,
  category,
  pathname,
});

export { component };

export default connect(mapStateToProps)(component);

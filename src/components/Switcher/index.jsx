import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

const component = ({ page }) => (
  <div className={styles.switcher}>
    <UniversalComponent page={page} />
  </div>
);

component.propTypes = {
  page: PropTypes.string.isRequired,
};

export const mapStateToProps = ({ page }) => ({ page });

export { component };

export default connect(mapStateToProps)(component);

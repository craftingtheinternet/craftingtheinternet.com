import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Sidebar from 'containers/Sidebar';
import Switcher from 'containers/Switcher';

import styles from 'containers/App/styles.styl';

const component = ({ panelColor }) => (
  <div
    className={styles.app}
    style={{ backgroundColor: panelColor }}
  >
    <Sidebar />
    <Switcher />
  </div>
);

component.displayName = 'App';
component.defaultProps = {
  panelColor: undefined,
};
component.propTypes = {
  panelColor: PropTypes.string,
};

const mapStateToProps = state => ({
  panelColor: state.panelColor,
});

export { component };

export default connect(mapStateToProps)(component);

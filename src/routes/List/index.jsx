import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SelfPortrait from 'components/SelfPortrait';

import styles from 'routes/List/styles.styl';

const component = ({
  category,
  packages,
}) => (
  <div className={styles.list}>
    <div className={styles.title}>Category: {category}</div>
    <div className={styles.content}>
      <ul>{packages.map(pkg => <li key={pkg}>{pkg}</li>)}</ul>
      <div style={{ width: 460, height: 720 }}>
        <SelfPortrait width={460} />
      </div>
    </div>
  </div>
);

component.displayName = 'List';
component.propTypes = {
  category: PropTypes.string.isRequired,
  packages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = state => ({
  category: state.category,
  packages: state.packages,
});

export default connect(mapStateToProps)(component);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Switcher from 'containers/Switcher';
import Navigation from 'components/Navigation';
import Image from 'components/Image';
import styles from './styles.styl';

const component = ({
  page,
  panelColor,
  pageIdent,
  typeColor,
}) => (
  <div className={styles.container} style={{ backgroundColor: panelColor }}>
    <div className={styles.sidebar}>
      <div className={styles.brandIdent}>
        <Image src="Crafting" color="white" />
      </div>
      <div className={styles.pageIdent}>
        {pageIdent && <Image src={pageIdent} color={typeColor} />}
      </div>
    </div>
    <div className={styles.contentPane}>
      <Navigation current={page} />
      <main className={styles.content}>
        <Switcher />
      </main>
    </div>
  </div>
);

component.displayName = 'App';
component.defaultProps = {
  panelColor: undefined,
  pageIdent: undefined,
  typeColor: undefined,
};
component.propTypes = {
  page: PropTypes.string.isRequired,
  panelColor: PropTypes.string,
  pageIdent: PropTypes.string,
  typeColor: PropTypes.string,
};

const mapStateToProps = state => ({
  page: state.page,
  panelColor: state.panelColor,
  pageIdent: state.pageIdent,
  typeColor: state.typeColor,
});

export { component };

export default connect(mapStateToProps)(component);

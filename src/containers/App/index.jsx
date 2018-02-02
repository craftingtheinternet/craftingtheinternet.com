import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import Switcher from 'containers/Switcher';
import Image from 'components/Image';
import Navigation from 'components/Navigation';
import styles from './styles.styl';

class component extends PureComponent {
  static displayName = 'App';
  static defaultProps = {
    panelColor: undefined,
    pageIdent: undefined,
    typeColor: undefined,
    hasPreviousLocation: false,
  };
  static propTypes = {
    page: PropTypes.string.isRequired,
    panelColor: PropTypes.string,
    pageIdent: PropTypes.string,
    typeColor: PropTypes.string,
    hasPreviousLocation: PropTypes.bool,
  };

  render() {
    const {
      page,
      panelColor,
      pageIdent,
      typeColor,
      hasPreviousLocation,
    } = this.props;
    return (
      <Fragment>
        <Helmet>
          <style>{`body { background-color: ${panelColor}; }`}</style>
        </Helmet>
        <div className={styles.heraldry}>
          <div className={styles.left}>
            <div className={[styles.ident, styles.padded].join(' ')}>
              <Image src="Crafting" color="white" disableAnimation={hasPreviousLocation} />
            </div>
          </div>
          <div className={[styles.right, styles.fill].join(' ')}>
            <Navigation current={page} color={typeColor} />
          </div>
        </div>
        <div className={styles.heraldry}>
          <div className={styles.left}>
            <div className={styles.ident}>
              <div className={styles.strapline}>
                <Image src="TheInternet" color="white" disableAnimation={hasPreviousLocation} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.contentPane}>
          <div className={styles.left}>
            <figure className={styles.pageIdent}>
              {pageIdent && <Image src={pageIdent} color={typeColor} />}
            </figure>
          </div>
          <main className={[styles.content, styles.right].join(' ')}>
            <Switcher typeColor={typeColor} />
          </main>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  page: state.page,
  panelColor: state.panelColor,
  pageIdent: state.pageIdent,
  typeColor: state.typeColor,
  hasPreviousLocation: !!state.location.prev.pathname,
});

export { component };

export default connect(mapStateToProps)(component);

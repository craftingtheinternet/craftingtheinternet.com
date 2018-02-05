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
    desktop: false,
    tablet: false,
    mobile: false,
    mediaType: undefined,
  };
  static propTypes = {
    page: PropTypes.string.isRequired,
    panelColor: PropTypes.string,
    pageIdent: PropTypes.string,
    typeColor: PropTypes.string,
    hasPreviousLocation: PropTypes.bool,
    desktop: PropTypes.bool,
    tablet: PropTypes.bool,
    mobile: PropTypes.bool,
    mediaType: PropTypes.string,
  };

  constructor() {
    super();
    this.state = { breakpointHasChanged: false };
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.mediaType !== this.props.mediaType) {
      this.setState(() => ({ breakpointHasChanged: true }));
    }
  }

  render() {
    const {
      page,
      panelColor,
      pageIdent,
      typeColor,
      hasPreviousLocation,
      desktop,
      tablet,
      mobile,
      mediaType,
    } = this.props;
    const {
      breakpointHasChanged,
    } = this.state;
    return (
      <Fragment>
        <Helmet>
          <style>{`body { background-color: ${panelColor}; }`}</style>
          <meta name="viewport" content="scale: 1.0" />
        </Helmet>
        <div className={styles.heraldry}>
          <div className={styles.left}>
            <div className={[styles.ident, styles.padded].join(' ')}>
              <Image
                src="Crafting"
                color="white"
                disableAnimation={hasPreviousLocation || breakpointHasChanged}
              />
            </div>
          </div>
          {desktop && (
            <div className={[styles.right, styles.fill].join(' ')}>
              <Navigation
                current={page}
                color={typeColor}
                orientation="horizontal"
              />
            </div>
          )}
        </div>
        <div className={styles.heraldry}>
          <div className={styles.left}>
            <div className={styles.ident}>
              <div className={styles.strapline}>
                <Image
                  src="TheInternet"
                  color="white"
                  disableAnimation={hasPreviousLocation || breakpointHasChanged}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.contentPane}>
          <div className={[styles.left, mediaType].join(' ')}>
            {tablet && (
              <Navigation
                current={page}
                color={typeColor}
                orientation="vertical"
              />
            )}
            <figure className={styles.pageIdent}>
              {pageIdent && (
                <Image
                  src={pageIdent}
                  color={typeColor}
                  disableAnimation={breakpointHasChanged}
                />
              )}
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
  desktop: state.breakpoint.greaterThan.medium,
  tablet: state.breakpoint.is.medium,
  mobile: state.breakpoint.lessThan.medium,
  mediaType: state.breakpoint.mediaType,
});

export { component };

export default connect(mapStateToProps)(component);

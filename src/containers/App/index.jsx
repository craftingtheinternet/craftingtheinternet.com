import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import Switcher from 'containers/Switcher';
import BrandIdent from 'components/BrandIdent';
import Strapline from 'components/Strapline';
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
    const disableAnimation = hasPreviousLocation || breakpointHasChanged;
    return (
      <Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
          <meta name="theme-color" content={panelColor} />
          <style>{`body { background-color: ${panelColor}; }`}</style>
        </Helmet>
        {mobile && (
          null
        )}
        {desktop && (
          <Fragment>
            <div className={styles.heraldry}>
              <div className={styles.left}>
                <BrandIdent disableAnimation={disableAnimation} />
              </div>
              <div className={[styles.right, styles.fill].join(' ')}>
                <Navigation
                  current={page}
                  color={typeColor}
                  orientation="horizontal"
                />
              </div>
            </div>
            <div className={styles.heraldry}>
              <div className={styles.left}>
                <Strapline disableAnimation={disableAnimation} />
              </div>
            </div>
          </Fragment>
        )}
        <div className={[styles.contentPane, mediaType].join(' ')}>
          <div className={styles.left}>
            {tablet && (
              <Fragment>
                <BrandIdent disableAnimation={disableAnimation} />
                <Strapline disableAnimation={disableAnimation} />
                <Navigation
                  current={page}
                  color={typeColor}
                  orientation="vertical"
                />
              </Fragment>
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

import * as React from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";

import Switcher from "containers/Switcher";

import BrandIdent from "components/BrandIdent";
import Image from "components/Image";
import Navigation from "components/Navigation";
import Strapline from "components/Strapline";

import * as styles from "./styles.styl";

interface MappedProps {
  desktop: boolean;
  hasPreviousLocation: boolean;
  mediaType?: string;
  mobile: boolean;
  page: string;
  pageIdent?: string;
  panelColor?: string;
  openGraphImage?: string;
  tablet: boolean;
  title: string;
  typeColor?: string;
}

interface ReduxProps {
  breakpoint: {
    greaterThan: {
      medium: boolean;
    };
    is: {
      medium: boolean;
    };
    lessThan: {
      medium: boolean;
    };
    mediaType?: string;
  };
  location: {
    prev: {
      pathname?: string;
    };
  };
  openGraphImage?: string;
  page: string;
  panelColor?: string;
  pageIdent?: string;
  title: string;
  typeColor?: string;
}

class ReactComponent extends React.PureComponent<MappedProps> {
  public static displayName = "App";
  public static defaultProps = {
    desktop: false,
    hasPreviousLocation: false,
    mobile: false,
    tablet: false
  };

  public render() {
    const {
      desktop,
      hasPreviousLocation,
      mediaType,
      mobile,
      openGraphImage,
      page,
      panelColor,
      pageIdent,
      tablet,
      title,
      typeColor
    } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, minimum-scale=1"
          />
          <meta name="theme-color" content={panelColor} />
          <meta name="robots" content="index, follow" />
          <meta
            property="og:image"
            content={`https://craftingtheinternet.com/opengraph/${openGraphImage}`}
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" type="image/png" href="/favicon.png" />
          <style>{`body { background-color: ${panelColor}; }`}</style>
        </Helmet>
        {mobile && (
          <div className={styles.mobileHeraldry}>
            <div className={styles.mobileBranding}>
              <BrandIdent disableAnimation={hasPreviousLocation} />
              <Strapline disableAnimation={hasPreviousLocation} />
            </div>
            <figure className={styles.mobilePageIdent}>
              {pageIdent && (
                <Image
                  color={typeColor}
                  disableAnimation={!hasPreviousLocation}
                  src={pageIdent}
                />
              )}
            </figure>
          </div>
        )}
        {desktop && (
          <React.Fragment>
            <div className={styles.heraldry}>
              <div className={styles.left}>
                <BrandIdent disableAnimation={hasPreviousLocation} />
              </div>
              <div className={[styles.right, styles.fill].join(" ")}>
                <Navigation color={typeColor} orientation="horizontal" />
              </div>
            </div>
            <div className={styles.heraldry}>
              <div className={styles.left}>
                <Strapline disableAnimation={hasPreviousLocation} />
              </div>
            </div>
          </React.Fragment>
        )}
        <div className={[styles.contentPane, mediaType].join(" ")}>
          {!mobile && (
            <div className={styles.left}>
              {tablet && (
                <React.Fragment>
                  <BrandIdent disableAnimation={hasPreviousLocation} />
                  <Strapline disableAnimation={hasPreviousLocation} />
                  <Navigation color={typeColor} orientation="vertical" />
                </React.Fragment>
              )}
              <figure className={styles.pageIdent}>
                {pageIdent && <Image src={pageIdent} color={typeColor} />}
              </figure>
            </div>
          )}
          <main
            className={[
              styles.content,
              mobile ? styles.mobileContent : styles.right
            ].join(" ")}
          >
            <Switcher typeColor={typeColor} />
          </main>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: ReduxProps): MappedProps => ({
  desktop: state.breakpoint.greaterThan.medium,
  hasPreviousLocation: !!state.location.prev.pathname,
  mediaType: state.breakpoint.mediaType,
  mobile: state.breakpoint.lessThan.medium,
  openGraphImage: state.openGraphImage,
  page: state.page,
  pageIdent: state.pageIdent,
  panelColor: state.panelColor,
  tablet: state.breakpoint.is.medium,
  title: state.title,
  typeColor: state.typeColor
});

export { ReactComponent };

export default connect(mapStateToProps)(ReactComponent);

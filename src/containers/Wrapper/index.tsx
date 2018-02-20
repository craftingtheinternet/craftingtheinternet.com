import * as PropTypes from "prop-types";
import * as React from "react";
import { connect } from "react-redux";
import Sidebar from "react-sidebar";

import HamburgerMenu from "components/HamburgerMenu";
import App from "containers/App";
import MobileNavigation from "containers/MobileNavigation";

import { toggle, toggleType } from "actions/sidebar";
import { contentClassName } from "manifests/sidebar.json";

export interface Props {
  mobile: boolean;
  panelColor?: string;
  sidebarOpen: boolean;
  toggleSidebar: toggleType;
  typeColor?: string;
}

export interface MappedProps {
  breakpoint: {
    lessThan: {
      medium: boolean;
    };
  };
  panelColor: string;
  sidebar: {
    open: boolean;
  };
  typeColor: string;
}

class ReactComponent extends React.PureComponent<Props & MappedProps> {
  public static displayName = "Wrapper";
  public static defaultProps = {
    mobile: false,
    sidebarOpen: false
  };
  public static propTypes = {
    mobile: PropTypes.bool,
    panelColor: PropTypes.string,
    sidebarOpen: PropTypes.bool,
    toggleSidebar: PropTypes.func.isRequired,
    typeColor: PropTypes.string
  };

  public render() {
    const {
      sidebarOpen,
      toggleSidebar,
      typeColor,
      panelColor,
      mobile
    } = this.props;
    return mobile ? (
      <React.Fragment>
        <Sidebar
          contentClassName={contentClassName}
          onSetOpen={toggleSidebar as any}
          open={sidebarOpen}
          pullRight={true}
          shadow={false}
          sidebar={
            <MobileNavigation color={typeColor} panelColor={panelColor} />
          }
        >
          <App />
        </Sidebar>
        <HamburgerMenu
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      </React.Fragment>
    ) : (
      <App />
    );
  }
}

const mapStateToProps = (state: MappedProps) => ({
  mobile: state.breakpoint.lessThan.medium,
  panelColor: state.panelColor,
  sidebarOpen: state.sidebar.open,
  typeColor: state.typeColor
});

const mapDispatchToProps = {
  toggleSidebar: toggle
};

export { ReactComponent };

export default connect(mapStateToProps, mapDispatchToProps)(ReactComponent);

import * as React from "react";
import * as PropTypes from "prop-types";
import { connect } from "react-redux";
import Sidebar from "react-sidebar";

import App from "containers/App";
import MobileNavigation from "containers/MobileNavigation";
import HamburgerMenu from "components/HamburgerMenu";

import * as sidebarActions from "actions/sidebar";
import { contentClassName } from "manifests/sidebar.json";

export type ToggleSidebarFunc = (isOpen: boolean) => object;

export interface Props {
  panelColor?: string;
  typeColor?: string;
  mobile: boolean;
  sidebarOpen: boolean;
  toggleSidebar: ToggleSidebarFunc;
}

class StatefulComponent extends React.PureComponent<Props> {
  static displayName = "Wrapper";
  static defaultProps = {
    mobile: false,
    sidebarOpen: false
  };
  static propTypes = {
    panelColor: PropTypes.string,
    typeColor: PropTypes.string,
    mobile: PropTypes.bool,
    sidebarOpen: PropTypes.bool,
    toggleSidebar: PropTypes.func.isRequired
  };

  render() {
    const {
      sidebarOpen,
      toggleSidebar,
      typeColor,
      panelColor,
      mobile
    } = this.props;
    const sidebarProps = mobile
      ? {
          sidebar: (
            <MobileNavigation color={typeColor} panelColor={panelColor} />
          ),
          pullRight: true,
          shadow: false,
          open: sidebarOpen,
          onSetOpen: toggleSidebar,
          contentClassName
        }
      : {};
    return (
      <React.Fragment>
        {React.createElement(
          mobile ? Sidebar : React.Fragment,
          { ...(sidebarProps as any) },
          <App />
        )}
        {mobile && (
          <HamburgerMenu
            sidebarOpen={sidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  panelColor: state.panelColor,
  typeColor: state.typeColor,
  mobile: state.breakpoint.lessThan.medium,
  sidebarOpen: state.sidebar.open
});

const mapDispatchToProps = {
  toggleSidebar: sidebarActions.toggle
};

export { StatefulComponent as component };

export default connect(mapStateToProps, mapDispatchToProps)(StatefulComponent);

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Sidebar from 'react-sidebar';
import App from 'containers/App';
import MobileNavigation from 'components/MobileNavigation';
import * as sidebarActions from 'actions/sidebar';

class component extends PureComponent {
  static displayName = 'Wrapper';
  static defaultProps = {
    panelColor: undefined,
    typeColor: undefined,
    mobile: false,
    sidebarOpen: false,
  };
  static propTypes = {
    panelColor: PropTypes.string,
    typeColor: PropTypes.string,
    mobile: PropTypes.bool,
    sidebarOpen: PropTypes.bool,
    toggleSidebar: PropTypes.func.isRequired,
  };

  render() {
    const {
      sidebarOpen,
      toggleSidebar,
      typeColor,
      panelColor,
      mobile,
    } = this.props;
    const sidebarProps = mobile ? {
      sidebar: (
        <MobileNavigation
          color={typeColor}
          panelColor={panelColor}
        />
      ),
      pullRight: true,
      shadow: false,
      open: sidebarOpen,
      onSetOpen: toggleSidebar,
    } : {};
    return React.createElement(mobile ? Sidebar : Fragment, { ...sidebarProps }, <App />);
  }
}

const mapStateToProps = state => ({
  panelColor: state.panelColor,
  typeColor: state.typeColor,
  mobile: state.breakpoint.lessThan.medium,
  sidebarOpen: state.sidebar.open,
});

const mapDispatchToProps = {
  toggleSidebar: sidebarActions.toggle,
};

export { component };

export default connect(mapStateToProps, mapDispatchToProps)(component);

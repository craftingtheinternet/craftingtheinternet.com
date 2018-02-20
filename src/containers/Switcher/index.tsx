import * as PropTypes from "prop-types";
import * as React from "react";
import { connect } from "react-redux";
import { Transition, TransitionGroup } from "transition-group";

import universal from "react-universal-component";
import * as selectors from "selectors";

import styles from "containers/Switcher/styles.styl";

export interface Props {
  page: string;
  pathname: string;
  typeColor?: string;
  isLoading: boolean;
}

export interface MappedProps {
  isLoading: boolean;
  page: string;
  location: {
    pathname: string;
  };
}

export interface UniversalComponentProps {
  page: string;
  isLoading: boolean;
  typeColor: string;
}

const DURATION = 300;

const UniversalComponent: React.SFC<UniversalComponentProps> = universal(
  ({ page }) => import(`routes/${page}`),
  {
    error: () => <div>PAGE NOT FOUND - 404</div>,
    loading: () => <div>...</div>,
    minDelay: 500
  }
);

const component: React.SFC<Props> = ({
  page,
  pathname,
  typeColor,
  isLoading
}) => (
  <TransitionGroup
    component="div"
    duration={DURATION}
    className={styles.switcher}
    prefix={styles.transition}
  >
    <Transition key={`${pathname}${isLoading}`}>
      <UniversalComponent
        page={page}
        isLoading={isLoading}
        typeColor={typeColor}
      />
    </Transition>
  </TransitionGroup>
);

component.defaultProps = {
  isLoading: false,
  typeColor: "black"
};
component.propTypes = {
  isLoading: PropTypes.bool,
  page: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  typeColor: PropTypes.string
};

export const mapStateToProps = (state: MappedProps) => ({
  isLoading: selectors.isLoading(state),
  page: state.page,
  pathname: state.location.pathname
});

export { component };

export default connect(mapStateToProps)(component);

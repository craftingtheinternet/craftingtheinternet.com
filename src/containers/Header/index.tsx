import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './styles.styl';

export interface Props {
  giant: boolean;
  level?: number;
  children: any;
  mediaType: string;
  mobile: boolean;
}

export interface ReduxProps {
  breakpoint: {
    mediaType: string;
    lessThan: {
      medium: boolean;
    };
  };
}

const removeOrphans = (text: string): string => text
  .split(' ')
  .slice(0, text.split(' ').length - 2)
  .concat(text
    .split(' ')
    .slice(-2)
    .join('\xa0'))
  .join(' ');

const component: React.SFC<Props> = ({
  giant,
  level,
  children,
  mediaType,
  mobile,
}) => (
    children ? (
      React.createElement(
        `h${level}`,
        { className: [styles[`h${level}`], mediaType, giant ? styles.giant : ''].join(' ') },
        mobile ? children : removeOrphans(children),
      )
    ) : (
        null
      )
  );

component.displayName = 'Header';
component.defaultProps = {
  giant: false,
  level: 1,
  mediaType: '',
  mobile: false,
};
component.propTypes = {
  giant: PropTypes.bool,
  level: PropTypes.oneOf([1, 2, 3, 4, 5]),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  mediaType: PropTypes.string.isRequired,
  mobile: PropTypes.bool,
};

const mapStateToProps = (state: ReduxProps) => ({
  mediaType: state.breakpoint.mediaType,
  mobile: state.breakpoint.lessThan.medium,
});

export { component };

export default connect(mapStateToProps)(component);

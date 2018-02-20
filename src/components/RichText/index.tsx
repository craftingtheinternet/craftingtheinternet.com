import * as React from 'react';
import * as PropTypes from 'prop-types';
import activeHtml from 'react-active-html';

import styles from './styles.styl';

export interface Props {
  children: string;
}

const component: React.SFC<Props> = ({
  children,
}) => (
    <div className={styles.content}>
      {typeof children === 'string' && activeHtml(children)}
    </div>
  );

component.displayName = 'RichText';
component.propTypes = {
  children: PropTypes.string.isRequired,
};

export default component;

import React from 'react';

import Sidebar from '../Sidebar';
import Switcher from '../Switcher';

import styles from '../../styl/App.styl';

const App = () => (
  <div className={styles.app}>
    <Sidebar />
    <Switcher />
  </div>
);

export default App;

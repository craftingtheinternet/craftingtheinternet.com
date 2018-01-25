import React from 'react';

import Sidebar from 'containers/Sidebar';
import Switcher from 'containers/Switcher';

import styles from '../../styl/App.styl';

const App = () => (
  <div className={styles.app}>
    <Sidebar />
    <Switcher />
  </div>
);

export default App;

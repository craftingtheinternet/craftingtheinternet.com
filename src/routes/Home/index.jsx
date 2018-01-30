import React from 'react';

import SelfPortrait from 'components/SelfPortrait';

import styles from 'routes/Home/styles.styl';

const Home = () => (
  <div className={styles.home}>
    <h1 className={styles.title}>HOME</h1>
    <div style={{ width: 300 }}>
      <SelfPortrait />
    </div>
  </div>
);

export default Home;

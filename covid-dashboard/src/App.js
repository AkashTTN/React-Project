import React, { useEffect, useCallback } from 'react';
import NavigationItems from './components/NavigationItems/NavigationItems';
import KPI from './components/KPI/KPI';
import Search from './components/Search/Search';
import Trends from './components/Trends/Trends';
import Map from './components/Map/Map';
import News from './components/News/News';
import Recovery from './components/Recovery/Recovery';
import Tweets from './components/Tweets/Tweets';

import * as actions from './store/actions/index';
import { useDispatch } from 'react-redux';

import classes from './App.module.css';

const App = () => {
  console.log('App Mounted');
  // const globaState = useContext(store);
  // const { dispatch } = globaState;

  const dispatch = useDispatch();

  const onFetchStats = useCallback(() => dispatch(actions.getStats()), [dispatch]);
  const onFetchHistoricalData = useCallback(() => dispatch(actions.getHistoricalData()), [dispatch]);

  useEffect(() => {
    // Dispatch an action to fetch new stats data after every 10mins or 600000 seconds
    // console.log('useEffect ran');
    onFetchStats();
    const intervalId = setInterval(function () {
      console.log('setting interval');
      onFetchStats();
    }, 6000000)

    return () => clearInterval(intervalId);

  }, [onFetchStats]);

  useEffect(() => {
    // Dispatch an action to fetch new hostorical data after every 1hr
    // console.log('useEffect ran');
    onFetchHistoricalData();
    const intervalId = setInterval(function () {
      console.log('setting interval');
      onFetchHistoricalData();
    }, 6000000)

    return () => clearInterval(intervalId);

  }, [onFetchHistoricalData]);

  return (
    <div className={classes.App}>
      <div className={classes.NavContainer}>
        <NavigationItems />
      </div>
      <div className={classes.BodyContainer} >
        <div className={classes.FirstContainer}>
          <div className={classes.FlexContainer}>
            <KPI />
          </div>
          <div className={classes.FlexContainer} >
            <Search />
            <Map />
          </div>
          <div className={classes.FlexContainer} >
            <Trends />
            <News />
          </div>
        </div>
        <div className={classes.SecondContainer}>
          <div className={classes.FlexContainer}>
            <Recovery />
            <Tweets />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

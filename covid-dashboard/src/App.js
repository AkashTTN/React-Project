import React, { useEffect } from 'react';
import NavigationItems from './components/NavigationItems/NavigationItems';
import KPI from './components/KPI/KPI';
import Search from './components/Search/Search';
import Trends from './components/Trends/Trends';
import * as actions from './store/actions/index';
import { useDispatch } from 'react-redux';

import './App.module.css';

const App = () => {
  console.log('app mounted')
  // const globaState = useContext(store);
  // const { dispatch } = globaState;
  const dispatch = useDispatch();

  const onFetchStats = () => dispatch(actions.getStats());

  useEffect(() => {
    // Dispatch an action to fetch new data after every 10mins
    console.log('useEffect ran');
    const intervalId = setInterval(function () {
      console.log('setting interval');
      onFetchStats();
    }, 600000)

    return () => clearInterval(intervalId);

  }, []);

  return (
    <div className="App">
      <NavigationItems />
      <KPI />
      <Search />
      {/* <Map /> */}
      <Trends />
    </div>
  );
}

export default App;

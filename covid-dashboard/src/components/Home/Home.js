import React, { useEffect, useCallback } from 'react';
import KPI from '../KPI/KPI';
import Search from '../Search/Search';
import Trends from '../Trends/Trends';
import Map from '../Map/Map';
import News from '../News/News';
import Recovery from '../Recovery/Recovery';
import Tweets from '../Tweets/Tweets';

import * as actions from '../../store/actions/index';
import { useDispatch } from 'react-redux';

import classes from './Home.module.css';

const Home = () => {
    console.log('App Mounted');
    // const globaState = useContext(store);
    // const { dispatch } = globaState;

    const dispatch = useDispatch();

    const onFetchStats = useCallback(() => dispatch(actions.getStats()), [dispatch]);
    const onFetchHistoricalData = useCallback(() => dispatch(actions.getHistoricalData()), [dispatch]);
    const onFetchTweets = useCallback(() => dispatch(actions.getTweets()), [dispatch]);

    // Setting refetch timer for stats data
    useEffect(() => {
        // Dispatch an action to fetch new stats data after every 10mins or 600000 seconds
        // console.log('useEffect ran');
        onFetchStats();
        const intervalId = setInterval(function () {
            onFetchStats();
        }, 6000000)

        return () => clearInterval(intervalId);

    }, [onFetchStats]);

    // Setting refetch timer for historical data
    useEffect(() => {
        // Dispatch an action to fetch new hostorical data after every 1hr
        // console.log('useEffect ran');
        onFetchHistoricalData();
        const intervalId = setInterval(function () {
            onFetchHistoricalData();
        }, 6000000)

        return () => clearInterval(intervalId);

    }, [onFetchHistoricalData]);

    // Setting refetch timer for tweets data
    useEffect(() => {
        // Dispatch an action to fetch new hostorical data after every 1hr
        // console.log('useEffect ran');
        onFetchTweets();
        const intervalId = setInterval(function () {
            onFetchTweets();
        }, 6000000)

        return () => clearInterval(intervalId);

    }, [onFetchTweets]);

    return (
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
    );
}

export default Home;

import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';

import KPI from '../KPI/KPI';
import Search from '../Search/Search';
import Trends from '../Trends/Trends';
import Map from '../Map/Map';
import News from '../News/News';
import Recovery from '../Recovery/Recovery';
import Tweets from '../Tweets/Tweets';

import * as am4core from "@amcharts/amcharts4/core";

import * as actions from '../../store/actions/index';

import classes from './Home.module.css';

const Home = ({ showCountryMode }) => {
    console.log('App Mounted');
    // const globaState = useContext(store);
    // const { dispatch } = globaState;

    const dispatch = useDispatch();

    const onFetchStats = useCallback(() => dispatch(actions.getStats()), [dispatch]);
    const onFetchHistoricalData = useCallback(() => dispatch(actions.getHistoricalData()), [dispatch]);
    const onFetchTweets = useCallback(() => dispatch(actions.getTweets()), [dispatch]);

    useEffect(() => {
        return () => {
            am4core.disposeAllCharts();
        }
    }, []);
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
        if (!showCountryMode) {
            onFetchHistoricalData();
            const intervalId = setInterval(function () {
                onFetchHistoricalData();
            }, 6000000)

            return () => clearInterval(intervalId);
        }

    }, [onFetchHistoricalData, showCountryMode]);

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
            {/* <div className={classes.Container} > */}
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
            {/* </div> */}
            {/* <div className={[classes.Footer, classes.FlexContainer]}>
            </div> */}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        showCountryMode: state.stats.showCountry.mode
    }
}

export default connect(mapStateToProps)(Home);

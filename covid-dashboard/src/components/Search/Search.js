import React, { useEffect, useRef, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import Country from './Country/Country';
import { formatNumbers } from '../Utilities/FormatNumbers';

import classes from './Search.module.css';
import { getHistoricalData, setCountryData } from '../../store/actions';

const Search = (props) => {

    const [enteredFilter, setEnteredFilter] = useState('');
    const [statsByCountry, setStatsByCountry] = useState(props.statsByCountry);

    const inputRef = useRef();

    let country = <p>Waiting for data...</p>;

    if(props.error) {
        country = <p>Something went wrong</p>;
    }

    if (statsByCountry) {
        country = statsByCountry.map((country) => {
            return (
                <Country
                    key={country.country}
                    flag={country.countryInfo.flag}
                    countryName={country.country}
                    affected={formatNumbers(country.cases)}
                    recovered={formatNumbers(country.recovered)}
                />
            )
        })
    }

    const onSearchCountryHandler = useCallback(countryName => {
        let countryToSearch = countryName.toLowerCase();
        let indexOfSearchedCountry = statsByCountry.findIndex((country) => {
            return country.country.toLowerCase() === countryToSearch;
        });

        if (indexOfSearchedCountry !== -1) {
            const updatedStatsByCountry = [...statsByCountry];
            let [searchedCountryData] = updatedStatsByCountry.splice(indexOfSearchedCountry, 1);
            updatedStatsByCountry.unshift(searchedCountryData);
            setStatsByCountry(updatedStatsByCountry);

            props.onSetCountryData(searchedCountryData);
            props.onFetchHistoricalData(countryToSearch);
        }

    }, [statsByCountry]);

    useEffect(() => {
        setStatsByCountry(props.statsByCountry);
    }, [props.statsByCountry])

    useEffect(() => {
        if (enteredFilter === inputRef.current.value && enteredFilter.length !== 0) {

            const timerId = setTimeout(() => {
                onSearchCountryHandler(enteredFilter);
                setEnteredFilter('');
            }, 500);

            return () => clearTimeout(timerId);
        }
    }, [enteredFilter, onSearchCountryHandler]);


    return (
        <div className={classes.Search}>
            <div className={classes['search-bar-container']} >
                <button type="button">
                    <i className="fa fa-search"></i>
                </button>
                <input
                    ref={inputRef}
                    value={enteredFilter}
                    onChange={(e) => setEnteredFilter(e.target.value)}
                    id="countryToSearch"
                    type="text"
                    placeholder="Search your country"
                />
            </div>
            {country}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        statsByCountry: state.stats.statsByCountry,
        error: state.status.stats['Stats']
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onSetCountryData: (data) => dispatch(setCountryData(data)),
        onFetchHistoricalData: (countryName) => dispatch(getHistoricalData(countryName))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
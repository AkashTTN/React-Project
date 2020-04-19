import React, { useEffect, useRef, useState, useCallback } from 'react';
import { connect } from 'react-redux';

import Country from './Country/Country';

import { formatNumbers } from '../Utilities/FormatNumbers';

import * as actions from '../../store/actions';

import classes from './Search.module.css';

const Search = (props) => {

    const [enteredFilter, setEnteredFilter] = useState('');
    const [statsByCountry, setStatsByCountry] = useState(props.statsByCountry);

    const inputRef = useRef();

    let country = <p>Waiting for data...</p>;

    if (props.error) {
        country = <p>Something went wrong</p>;
    }

    if (statsByCountry) {
        country = statsByCountry.map((country) => {

            const {
                country: countryName,
                countryInfo: { flag },
                cases,
                recovered,
                todayCases,
            } = country;

            const increasing = Math.abs(todayCases / cases) > Math.abs(recovered / cases)

            return (
                <Country
                    key={countryName}
                    flag={flag}
                    countryName={countryName}
                    affected={formatNumbers(cases)}
                    recovered={formatNumbers(recovered)}
                    increasing={increasing}
                />
            )
        })
    }

    const onSearchCountryHandler = useCallback(countryName => {
        let searchedCountry = countryName.toLowerCase();

        if (searchedCountry === 'world') {
            props.onSetWorld();
            return;
        }

        let indexOfSearchedCountry = statsByCountry.findIndex((country) => {
            return country.country.toLowerCase() === searchedCountry;
        });

        if (indexOfSearchedCountry !== -1) {
            const updatedStatsByCountry = [...statsByCountry];
            let [searchedCountryData] = updatedStatsByCountry.splice(indexOfSearchedCountry, 1);
            updatedStatsByCountry.unshift(searchedCountryData);
            setStatsByCountry(updatedStatsByCountry);

            props.onSetCountryMode(searchedCountry, searchedCountryData);

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
                    id="searchedCountry"
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
        onSetWorld: () => dispatch(actions.setWorld()),
        onSetCountryMode: (searchedCountry, searchedCountryData) => dispatch(actions.setCountryMode(searchedCountry, searchedCountryData))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import Country from './Country/Country';
import { formatNumbers } from '../../store/utility';

import classes from './Search.module.css';

const Search = (props) => {

    // const statsByCountry = useSelector((state) => {
    //     return state.stats.statsByCountry;
    // });
    const [enteredFilter, setEnteredFilter] = useState('');
    const [statsByCountry, setStatsByCountry] = useState(props.statsByCountry);
    // console.log(props.statsByCountry[1])
    // const [render, setRender] = useState(false);

    const inputRef = useRef();

    let country = <p>Waiting for data...</p>;
    // let statsByCountry;
    // if(props.statsByCountry == undefined) {
    //     statsByCountry = props.statsByCountry;
    // } else {
    //     statsByCountry = [...props.statsByCountry];
    // }


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
            let [searchedCountry] = updatedStatsByCountry.splice(indexOfSearchedCountry, 1);
            console.log(searchedCountry);
            updatedStatsByCountry.unshift(searchedCountry);
            console.log(updatedStatsByCountry);
            setStatsByCountry(updatedStatsByCountry);
        }
        // setRender(true);

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
        statsByCountry: state.stats.statsByCountry
    };
}

export default connect(mapStateToProps)(Search);
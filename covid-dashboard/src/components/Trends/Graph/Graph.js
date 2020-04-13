import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

import { connect } from 'react-redux';

import classes from './Graph.module.css';

const Graph = (props) => {

    const { historicalData } = props;

    let chart = <p>Loading...</p>;

    if (historicalData) {

        let formattedHistoricalData = historicalData.reduce((acc, country) => {
            console.log('Country data in loop', country);
            let { timeline: { cases, recovered, deaths } } = country;
            let entry = {};

            // let keyArray = Object.keys(timeline);

            for (let [date, data] of Object.entries(cases)) {

                let [month, day, year] = date.split('/');

                console.log(date, data, year);

                entry['date'] = new Date(year+'20', month - 1, day);
                entry['confirmed'] = data;
                entry['recovered'] = recovered[date];
                entry['deceased'] = Math.abs(data - recovered[date] - deaths[date]);
            }

            // for (let key of keyArray) {
            //     if (key === 'cases') {
            //         for (let [date, data] in Object.entries(cases)) {
            //             let [month, day, year] = date.split('/');
            //             entry['date'] = new Date(year, month - 1, day);
            //             entry['confirmed'] = data;
            //         }
            //     } else if (key === 'recovered') {
            //         // date key will be set in first if case
            //         for (let data in Object.values(recovered)) {
            //             entry['recovered'] = data;
            //         }
            //     } else {
            //         for (let [date, data] in Object.entries(deaths)) {
            //             entry['deceased'] = Maths.abs(data - );
            //         }
            //     }

            // }
            console.log('entry value', entry);
            return {
                date: entry['date'],
                confirmed: [+entry['confirmed'] + +acc['confirmed']],
                recovered: [+entry['recovered'] + +acc['recovered']],
                deceased: [+entry['deceased'] + +acc['deceased']]
            }

        }, { confirmed: 0, recovered: 0, deceased: 0 });
        console.log(formattedHistoricalData);
        // chart = am4core.create(classes.ChartDiv, am4charts.XYChart);
        // chart.data = [{}];
        // let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        // dateAxis.skipEmptyPeriods = true;

        // let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        // // chart.dataFormatter.inputDateFormat = "M/d/yyyy";

        // let series = chart.series.push(new am4charts.ColumnSeries());
        // series.dataFields.valueY = props.dataKey;
        // series.dataFields.dateX = "date";
    }

    return (
        <div className={classes.ChartDiv}>
            {chart ? null : chart}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        historicalData: state.stats.historicalData
    };
}

export default connect(mapStateToProps)(Graph);
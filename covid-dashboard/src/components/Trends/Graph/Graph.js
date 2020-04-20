import React, { useEffect, useState } from 'react';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

import { connect } from 'react-redux';

import classes from './Graph.module.css';

const formatData = (historicalData, dataKey) => {

    let data = [];

    if(dataKey === 'confirmed') {
        for(let [date, value] of Object.entries(historicalData['cases'])) {
            data.push({
                date: new Date(date),
                [dataKey]: value 
            });
        }
    } else if(dataKey === 'recovered') {
        for(let [date, value] of Object.entries(historicalData['recovered'])) {
            data.push({
                date: new Date(date),
                [dataKey]: value
            });
        }
    } else if (dataKey === 'deceased') {
        for(let [date, value] of Object.entries(historicalData['cases'])) {
            data.push({
                date: new Date(date),
                [dataKey]: value - historicalData['recovered'][date] - historicalData['deaths'][date]
            });
        }
    }

    return data;

}

const Graph = (props) => {
    
    const { historicalData, dataKey } = props;

    let chart = null;
    
    useEffect(() => {
        if (historicalData) {
            
            const data = formatData(historicalData, dataKey);
            
            chart = am4core.create(classes.ChartDiv, am4charts.XYChart);
            
            
            if(dataKey === 'recovered') {
                chart.colors.list = [ am4core.color('green') ];
            } else {
                chart.colors.list = [ am4core.color('red') ];
            }
            
            
            // Enable chart cursor
            chart.cursor = new am4charts.XYCursor();
            chart.cursor.lineX.disabled = true;
            chart.cursor.lineY.disabled = true;
            
            chart.data = data;
            
            // Create axes
            let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.dataFields.category = "Date";
            dateAxis.renderer.grid.template.location = 0.5;
            dateAxis.dateFormatter.inputDateFormat = "yyyy-MM-dd";
            dateAxis.renderer.minGridDistance = 40;
            dateAxis.tooltipDateFormat = "MMM dd, yyyy";
            dateAxis.dateFormats.setKey("day", "dd");
            
            let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.numberFormatter.numberFormat = "#.0 a"; 
            
            // Create series
            let series = chart.series.push(new am4charts.LineSeries());
            series.tooltipText = `{date}\n[bold font-size: 17px]${dataKey}: {valueY}[/]`;
            series.dataFields.valueY = dataKey;
            series.dataFields.dateX = "date";
            // series.strokeDasharray = 3;
            // series.strokeWidth = 2
            // series.strokeOpacity = 0.3;
            // series.strokeDasharray = "3,3"
            
            let bullet = series.bullets.push(new am4charts.CircleBullet());
            bullet.strokeWidth = 2;
            bullet.setStateOnChildren = true;
            bullet.propertyFields.fillOpacity = "opacity";
            bullet.propertyFields.strokeOpacity = "opacity";
            
            let hoverState = bullet.states.create("hover");
            hoverState.properties.scale = 1.7;
            
            function createTrendLine(data) {
                let trend = chart.series.push(new am4charts.LineSeries());
                trend.dataFields.valueY = "value";
                trend.dataFields.dateX = "date";
                trend.strokeWidth = 2
                trend.data = data;
                
                let bullet = trend.bullets.push(new am4charts.CircleBullet());
                bullet.tooltipText = "{date}\n[bold font-size: 17px]value: {valueY}[/]";
                bullet.strokeWidth = 2;
                
                let hoverState = bullet.states.create("hover");
                hoverState.properties.scale = 1.7;
                
                return trend;
            };
            
            createTrendLine(data);
            
            chart.responsive.enabled = true;

        }
        
    }, [historicalData, dataKey]);
    
    return (
        <div className={classes.ChartDiv}>
        </div>
    )
}

const mapStateToProps = state => {

    if(state.stats.showCountry.mode && state.stats.showCountry.historicalData) {
        return {
            historicalData: state.stats.showCountry.historicalData
        };
    }

    return {
        historicalData: state.stats.historicalData
    };

}

export default connect(mapStateToProps)(Graph);
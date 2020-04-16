import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

import classes from './Map.module.css';

const Map = (props) => {

    let map = null;

    useEffect(() => {
        return () => {
            map && map.dispose();
        }
    }, [map]);

    useEffect(() => {
        if (props.statsByCountry) {
            let dataForMap = props.statsByCountry.map((country) => {
                if (country.countryInfo.iso2 !== null) {
                    return {
                        id: [country.countryInfo.iso2].toString(),
                        value: [country.active].toString()
                    }
                }
                return undefined;
            });

            dataForMap = dataForMap.filter(Boolean);

            map = am4core.create(classes.MapDiv, am4maps.MapChart);
            map.geodata = am4geodata_worldLow;

            map.hiddenState.properties.opacity = 0; // this creates initial fade-in

            map.projection = new am4maps.projections.Miller();

            let polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
            let polygonTemplate = polygonSeries.mapPolygons.template;
            polygonTemplate.tooltipText = "{name}\nActive: [bold]{value.value.formatNumber('#.0')}";
            polygonSeries.heatRules.push({
                property: "fill",
                target: polygonSeries.mapPolygons.template,
                min: am4core.color("#FFC4C6"),
                max: am4core.color("#FF0019")
            });

            polygonSeries.useGeodata = true;

            map.zoomControl = new am4maps.ZoomControl();
            map.zoomControl.valign = "top";

            polygonSeries.data = dataForMap;
            polygonSeries.exclude = ["AQ"];

            map.responsive.enabled = true;
        }
    }, [props.statsByCountry]);

    return (
        <div className={classes.Map}>
            <p>COVID-19 Affected Areas</p>
            {map ? <p>Waiting for data...</p> : <div className={classes.MapDiv}></div>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        statsByCountry: state.stats.statsByCountry
    };
}

export default connect(mapStateToProps)(Map);

import React from 'react';
import Card from './Card/Card';
import { useSelector } from 'react-redux';

const KPI = () => {

    // const { globalStats } = useContext(store);
    // const cards = [];
    // for (let prop of globalStats){
    //     cards.push(
    //         <Card name={prop} magnitude={globalStats.prop} graphType='red' />
    //     )
    // }
    
    const globalStats = useSelector(state => {
        console.log('setting globalStats in KPI')
        return state.stats.globalStats;
    })
    console.log(globalStats);
    const cards = [];

    Object.entries(globalStats).map(item => {
        let [name, magnitude] = [...item];
        cards.push(
            <Card name={name} magnitude={magnitude} graphType='red' />
        )
    })

    return (
        <>
            {cards && <p>Waiting for data...</p>}
            {/* <Card name={name} magnitude={magnitude} graphType='red' />
            <Card name={name} magnitude={magnitude} graphType='green' />
            <Card name={name} magnitude={magnitude} graphType='red' />
            <Card name={name} magnitude={magnitude} graphType='red' /> */}
        </>
    )
}

export default KPI;
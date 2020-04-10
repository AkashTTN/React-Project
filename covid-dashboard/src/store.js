// import React, { createContext, useState, useReducer, useEffect } from 'react';

// // const initialState = { 'globalStats': null, 'statsByCountry': null };
// const [globalStats, setGlobalStats] = useState(null);
// const [statsByCountry, setStatsByCountry] = useState(null);

// const store = createContext({ globalStats, statsByCountry });
// const { Provider } = store;

// const baseURLForStats = 'http://corona.lmao.ninja/';

// const StateProvider = (props) => {

//     const makeRequest = (path) => {

//         fetch(baseURLForStats + path)
//             .then(res => res.json())
//             .then((data) => {
//                 console.log(data);
//                 if(path === 'all') {
//                     const { cases, recovered, active, deaths } = data;
//                     setGlobalStats({
//                         'Total Cases': cases,
//                         'Recovered': recovered,
//                         'Active Cases': active,
//                         'Total Deaths': deaths
//                     });
//                 } else {
//                     setStatsByCountry({
//                         data
//                     })
//                 }

//             })
//             .catch(err => console.log('ERROR fetching data', err))
//     }

//     const [state, dispatch] = useReducer((state, action) => {
//         console.log('inside reducer')
//         switch (action.type) {
//             case 'GET_NEWS':
//                 return state;

//             case 'GET_STATS':
//                 console.log('Sending request');
//                 // let newState = { ...state };
//                 makeRequest('all');
//                 makeRequest('yesterday?sort=critical');

//                 // fetch(baseURLForStats + 'all')
//                 //     .then(res => res.json())
//                 //     .then((data) => {
//                 //         console.log(data);
//                 //         const { cases, recovered, active, deaths } = data;
//                 //         newState['globalStats'] = {
//                 //             'Total Cases': cases,
//                 //             'Recovered': recovered,
//                 //             'Active Cases': active,
//                 //             'Total Deaths': deaths
//                 //         };

//                 //         return newState;
//                 //     })
//                 //     .catch(err => console.log('ERROR fetching global stats data', err))

//                 // fetch(baseURLForStats + 'yesterday?sort=critical')
//                 //     .then(res => res.json())
//                 //     .then((data) => {
//                 //         newState['statsByCountry'] = data;

//                 //         return newState;
//                 //     })
//                     //     .catch(err => console.log('ERROR fetching country stats data', err))

//             default:
//                 throw new Error();
//         }
//     }, initialState);

//     return <Provider value={{ state, dispatch }} {...props} >{props.children}</Provider>;
// };

// export { store, StateProvider };


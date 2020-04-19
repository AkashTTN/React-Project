export const getTrendStatus = (currentData, previousDayGlobalStats) => {

    const {
        deaths,
        cases,
        active,
        recovered,
        todayDeaths
    } = currentData;

    let isDeathsIncreasing = null;
    let isActiveIncreasing = null;
    let isRecoveredIncreasing = null;
    let isCasesIncreasing = null;

    if(previousDayGlobalStats) {
        isDeathsIncreasing = Math.abs(todayDeaths / deaths) > Math.abs(previousDayGlobalStats.deaths / deaths);
        isCasesIncreasing = cases > previousDayGlobalStats.cases;
        isActiveIncreasing = active > (previousDayGlobalStats.cases - previousDayGlobalStats.deaths - previousDayGlobalStats.recovered);
        isRecoveredIncreasing = recovered > previousDayGlobalStats.recovered;
    }

    return {
        isDeathsIncreasing,
        isCasesIncreasing,
        isActiveIncreasing,
        isRecoveredIncreasing
    }

}

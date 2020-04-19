export const getTrendStatus = (currentData, previousDayData) => {

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

    if(previousDayData) {
        isDeathsIncreasing = Math.abs(todayDeaths / deaths) > Math.abs(previousDayData.deaths / deaths);
        isCasesIncreasing = cases > previousDayData.cases;
        isActiveIncreasing = active > (previousDayData.cases - previousDayData.deaths - previousDayData.recovered);
        isRecoveredIncreasing = recovered > previousDayData.recovered;
    }

    return {
        isDeathsIncreasing,
        isCasesIncreasing,
        isActiveIncreasing,
        isRecoveredIncreasing
    }

}

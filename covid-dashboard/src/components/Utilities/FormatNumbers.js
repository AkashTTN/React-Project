import numeral from 'numeral';

// Function to format numbers in k format
export const formatNumbers = (value) => {

    let updatedValue;

    if(typeof value === 'object') {
        updatedValue = {...value};
        for(let prop in updatedValue) {
            updatedValue[prop] = numeral(updatedValue[prop]).format('0a');
        }
    } else if(typeof value === 'number' && !isNaN(value)) {
        updatedValue = numeral(value).format('0a');
    }

    return updatedValue;
}
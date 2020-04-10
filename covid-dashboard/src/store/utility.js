import numeral from 'numeral';

// Function to format numbers in k format
export const formatNumbers = (object) => {
    const updatedObject = {...object};

    for(let prop in updatedObject) {
        updatedObject[prop] = numeral(updatedObject[prop]).format('0a');
    }

    return updatedObject;
}
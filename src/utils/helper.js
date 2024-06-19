import moment from "moment-timezone";

export const convertDate = (date) => {
    return moment(date).tz('Asia/Kolkata').format('DD-MM-YYYY');
}

export const converReverseDate = (date) => {
    return moment(date).tz('Asia/Kolkata').format('YYYY-MM-DD');
}


export const getDateAndTimeFromUnixTimestamp = (isoDate) => {
    return moment(isoDate).tz('Asia/Kolkata').format('LLL');
}

export const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
};

export const capitalizeAndConcat = (first_name, last_name) => {
    const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    const capitalizedFirstName = capitalize(first_name);
    const capitalizedLastName = capitalize(last_name);

    return `${capitalizedFirstName} ${capitalizedLastName}`;
}
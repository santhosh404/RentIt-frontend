import moment from "moment-timezone";

export const convertDate = (date) => {
    return moment(date).tz('Asia/Kolkata').format('DD-MM-YYYY');
}

export const getDateAndTimeFromUnixTimestamp = (isoDate) => {
    return moment(isoDate).tz('Asia/Kolkata').format('LLL');
}

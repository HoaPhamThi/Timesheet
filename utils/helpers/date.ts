import moment from 'moment';

export const formatDate = (date: string | undefined, format: string) => {
    return moment.utc(date).local().format(format);
};

export const getCurrentDate = (format: string) => {
    return moment().format(format);
};

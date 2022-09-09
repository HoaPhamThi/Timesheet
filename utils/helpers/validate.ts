import { regex, enums } from '@utils/constants';
import moment from 'moment';
export const isEmpty = (value: string) => {
    if (!value) {
        return true;
    }

    return false;
};

export const isEmail = (value: string) => {
    if (regex.RULE.EMAIL.test(value)) {
        return true;
    }
    return false;
};

export const isNumber = (value: string) => {
    if (regex.RULE.NUMBER.test(value)) {
        return true;
    }
    return false;
};

export const isValidTimeRange = (timeFrom: string | undefined, timeTo: string | undefined) => {
    const from = moment(timeFrom, 'HH:mm');
    const to = moment(timeTo, 'HH:mm');
    if (to.diff(from, 'hours') < 0 || (to.diff(from, 'hours') === 0 && to.diff(from, 'minutes') % 60 < 0)) {
        return false;
    }
    return true;
};
export const isWidthHeight = (value: any) => {
    if (value.width > enums.IMAGES.OFFICIAL_AVATAR_RESOLUTION || value.height > enums.IMAGES.OFFICIAL_AVATAR_RESOLUTION) {
        return true;
    }
    return false;
};

export const isSizeAvatar = (value: any) => {
    if (value.size > enums.IMAGES.MAX_IMAGES_SIZE) {
        return true;
    }

    return false;
};

export const isTypeAvatar = (value: any) => {
    const imageMimeType = /image\/(png|jpg|jpeg)/i;
    if (!value.type.match(imageMimeType)) {
        return true;
    }

    return false;
};

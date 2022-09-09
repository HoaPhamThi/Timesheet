import { routes, http } from '@utils/constants';
import { axios } from '@utils/plugins';

export const login = async (data: ILoginDataAPI) => {
    try {
        return await axios.post<ILoginAPIRes>(`${routes.API.LOGIN.href}`, data);
    } catch (err) {
        throw err;
    }
};
export const changePassWord = async (data: IChangePasswordComponentState) => {
    try {
        return await axios.put<IChangePassWordRes>(`${routes.API.CHANGE_PASSWORD.href}`, data);
    } catch (err) {
        throw err;
    }
};

export const getNotice = async (sort: string = '', page: number, perpage: number) => {
    try {
        const res = await axios.get<INoticeDataAPI[]>(`${routes.API.HOME_NOTICE.href}?sort=${sort}&page=${page}&perpage=${perpage}`);
        const result: INoticeAPIRes = {
            code: http.SUCCESS_CODE,
            data: res.data,
        };
        return result;
    } catch (err) {
        throw err;
    }
};
export const getWorksheet = async (page: number, perpage: number, sort: string, startDate: any, endDate: any, month: string) => {
    try {
        const res = await axios.get<IWorksheetDataAPI[]>(
            `${routes.API.WORKSHEET.href}?page=${page}&perpage=${perpage}&work_date=${sort}&start_date=${startDate}&end_date=${endDate}&month=${month}`,
        );

        const result: IWorksheetAPIRes = {
            code: http.SUCCESS_CODE,
            data: res.data,
        };
        return result;
    } catch (err) {
        throw err;
    }
};

export const getMembderDetail = async () => {
    try {
        const res = await axios.get<IEditProfileComponentState>(`${routes.API.EDIT_PROFILE.href}`);
        const result: IMemberAPIRes = {
            code: http.SUCCESS_CODE,
            data: res.data,
        };
        return result;
    } catch (err) {
        throw err;
    }
};

export const postMemberInfo = async (data: IEditProfileComponentState) => {
    try {
        const res = await axios.put<IEditProfileComponentState>(`${routes.API.UPDATE_PROFILE.href}`, data);
        const result: IMemberAPIRes = {
            code: http.SUCCESS_CODE,
            data: res.data,
        };
        return result;
    } catch (err) {
        throw err;
    }
};

export const getRequest = async (id: number, type: number) => {
    try {
        const res = await axios.get<IRequestDataAPI>(`${routes.API.WORKSHEET.href}/${id}/${type}`);
        const result: IRequestRes = {
            code: http.SUCCESS_CODE,
            data: res.data,
        };
        return result;
    } catch (err) {
        throw err;
    }
};
export const postRegisterForget = async (data: IForgetCheckComponentState) => {
    try {
        const res = await axios.post<IForgetCheckComponentState>(`${routes.API.FORGET.href}`, data);
        const result: IRequestRes = {
            code: http.SUCCESS_CODE,
            data: res.data,
        };
        return result;
    } catch (err) {
        throw err;
    }
};

export const updateRegisterForget = async (data: IForgetCheckComponentState) => {
    try {
        const res = await axios.put<IForgetCheckComponentState>(`${routes.API.UPDATE_FORGET_MODAL.href}`, data);
        const result: IRequestRes = {
            code: http.SUCCESS_CODE,
            data: res.data,
        };
        return result;
    } catch (err) {
        throw err;
    }
};

export const postRegisterLateErly = async (data: ILateErlyComponentState) => {
    try {
        const res = await axios.post<ILateErlyComponentState>(`${routes.API.POST_LATE_EARLY.href}`, data);
        const result: IRequestRes = {
            code: http.SUCCESS_CODE,
            data: res.data,
        };
        return result;
    } catch (err) {
        throw err;
    }
};

export const updateRegisterLateErly = async (data: ILateErlyComponentState) => {
    try {
        const res = await axios.put<ILateErlyComponentState>(`${routes.API.EDIT_LATE_EARLY.href}`, data);
        const result: IRequestRes = {
            code: http.SUCCESS_CODE,
            data: res.data,
        };
        return result;
    } catch (err) {
        throw err;
    }
};
export const postRegisterOvertime = async (data: IOvertimeCheckComponentState) => {
    try {
        const res = await axios.post<IOvertimeCheckComponentState>(`${routes.API.OVERTIME.href}`, data);
        const result: IRequestRes = {
            code: http.SUCCESS_CODE,
            data: res.data,
        };
        return result;
    } catch (err) {
        throw err;
    }
};

export const updateRegisterOvertime = async (data: IOvertimeCheckComponentState) => {
    try {
        const res = await axios.put<IOvertimeCheckComponentState>(`${routes.API.UPDATE_OVERTIME_MODAL.href}`, data);
        const result: IRequestRes = {
            code: http.SUCCESS_CODE,
            data: res.data,
        };
        return result;
    } catch (err) {
        throw err;
    }
};

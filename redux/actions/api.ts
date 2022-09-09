import { Dispatch } from 'redux';
import { AxiosError, AxiosResponse } from 'axios';

import { authHelper, apiHelper } from '@utils/helpers';

import { SET_LOADER } from '@redux/actions/type';

const setLoader = (data: boolean = false) => {
    return {
        type: SET_LOADER,
        data,
    };
};

export const fetchLogin = async (
    data: ILoginDataAPI,
    onSuccess?: (result?: ILoginAPIRes) => void,
    onFailure?: (result?: IErrorAPIRes) => void,
    isLoad: boolean = true,
) => {
    return async (dispatch: Dispatch) => {
        if (isLoad) {
            dispatch(setLoader(true));
        }

        try {
            const res = await apiHelper.login(data);
            authHelper.setAccessToken(res.data?.data?.access_token ?? '');
            if (onSuccess) {
                onSuccess(res?.data);
            }
        } catch (err) {
            if (!(err instanceof Error)) {
                const res = err as AxiosResponse<IErrorAPIRes, AxiosError>;
                if (onFailure) {
                    onFailure(res?.data);
                }
            }
        }

        if (isLoad) {
            dispatch(setLoader(false));
        }
    };
};

export const fetchChangePassWord = (
    data: IChangePasswordComponentState,
    callBack?: (result: IChangePassWordRes | IErrorAPIRes | null) => void,
    isLoad: boolean = true,
) => {
    return async (dispatch: Dispatch) => {
        if (isLoad) {
            dispatch(setLoader(true));
        }
        try {
            const res = await apiHelper.changePassWord(data);
            if (callBack) {
                callBack(res?.data);
            }
        } catch (err) {
            if (!(err instanceof Error)) {
                const res = err as AxiosResponse<IErrorAPIRes, AxiosError>;
                if (callBack) {
                    callBack(res?.data);
                }
            }
        }

        if (isLoad) {
            dispatch(setLoader(false));
        }
    };
};

export const fetchNotice = (
    sort: string,
    page: number,
    perpage: number,
    callBack?: (result: INoticeAPIRes | IErrorAPIRes | null) => void,
    isLoad: boolean = true,
) => {
    return async (dispatch: Dispatch) => {
        if (isLoad) {
            dispatch(setLoader(true));
        }

        try {
            const res = await apiHelper.getNotice(sort, page, perpage);
            if (callBack) {
                callBack(res);
            }
        } catch (err) {
            if (!(err instanceof Error)) {
                const res = err as AxiosResponse<IErrorAPIRes, AxiosError>;
                if (callBack) {
                    callBack(res?.data);
                }
            }
        }
        if (isLoad) {
            dispatch(setLoader(false));
        }
    };
};
export const fetchWorksheet = (
    page: number,
    perpage: number,
    sort: string,
    startDate: any,
    endDate: any,
    month: string,
    callBack?: (result: IWorksheetAPIRes | IErrorAPIRes | null) => void,
    isLoad: boolean = true,
) => {
    return async (dispatch: Dispatch) => {
        if (isLoad) {
            dispatch(setLoader(true));
        }
        try {
            const res = await apiHelper.getWorksheet(page, perpage, sort, startDate, endDate, month);
            if (callBack) {
                callBack(res);
            }
        } catch (err) {
            if (!(err instanceof Error)) {
                const res = err as AxiosResponse<IErrorAPIRes, AxiosError>;
                if (callBack) {
                    callBack(res.data);
                }
            }
        }
        if (isLoad) {
            dispatch(setLoader(false));
        }
    };
};

export const fetchMemberDetail = (callBack?: (result: IMemberAPIRes | IErrorAPIRes | null) => void, isLoad: boolean = true) => {
    return async (dispatch: Dispatch) => {
        if (isLoad) {
            dispatch(setLoader(true));
        }

        try {
            const res = await apiHelper.getMembderDetail();
            if (callBack) {
                callBack(res);
            }
        } catch (err) {
            if (!(err instanceof Error)) {
                const res = err as AxiosResponse<IErrorAPIRes, AxiosError>;
                if (callBack) {
                    callBack(res?.data);
                }
            }
        }

        if (isLoad) {
            dispatch(setLoader(false));
        }
    };
};

export const updateMember = (
    data: IEditProfileComponentState,
    callBack?: (result: IMemberAPIRes | IErrorAPIRes | null) => void,
    isLoad: boolean = true,
) => {
    return async (dispatch: Dispatch) => {
        if (isLoad) {
            dispatch(setLoader(true));
        }

        try {
            const res = await apiHelper.postMemberInfo(data);
            if (callBack) {
                callBack(res);
            }
        } catch (err) {
            if (!(err instanceof Error)) {
                const res = err as AxiosResponse<IErrorAPIRes, AxiosError>;
                if (callBack) {
                    callBack(res?.data);
                }
            }
        }

        if (isLoad) {
            dispatch(setLoader(false));
        }
    };
};

export const fetchRequest = (
    id: number,
    type: number,
    callBack?: (result: IRequestRes | IErrorAPIRes | null) => void,
    isLoad: boolean = true,
) => {
    return async (dispatch: Dispatch) => {
        if (isLoad) {
            dispatch(setLoader(true));
        }
        try {
            const res = await apiHelper.getRequest(id, type);
            if (callBack) {
                callBack(res);
            }
        } catch (err) {
            if (!(err instanceof Error)) {
                const res = err as AxiosResponse<IErrorAPIRes, AxiosError>;
                if (callBack) {
                    callBack(res?.data);
                }
            }
        }

        if (isLoad) {
            dispatch(setLoader(false));
        }
    };
};

export const createForgetCheck = (
    data: IForgetCheckComponentState,
    callBack?: (result: IRequestRes | IErrorAPIRes | null) => void,
    isLoad: boolean = true,
) => {
    return async (dispatch: Dispatch) => {
        if (isLoad) {
            dispatch(setLoader(true));
        }

        try {
            const res = await apiHelper.postRegisterForget(data);
            if (callBack) {
                callBack(res);
            }
        } catch (err) {
            if (!(err instanceof Error)) {
                const res = err as AxiosResponse<IErrorAPIRes, AxiosError>;
                if (callBack) {
                    callBack(res?.data);
                }
            }
        }

        if (isLoad) {
            dispatch(setLoader(false));
        }
    };
};

export const updateForgetCheck = (
    data: IForgetCheckComponentState,
    callBack?: (result: IRequestRes | IErrorAPIRes | null) => void,
    isLoad: boolean = true,
) => {
    return async (dispatch: Dispatch) => {
        if (isLoad) {
            dispatch(setLoader(true));
        }

        try {
            const res = await apiHelper.updateRegisterForget(data);
            if (callBack) {
                callBack(res);
            }
        } catch (err) {
            if (!(err instanceof Error)) {
                const res = err as AxiosResponse<IErrorAPIRes, AxiosError>;
                if (callBack) {
                    callBack(res?.data);
                }
            }
        }

        if (isLoad) {
            dispatch(setLoader(false));
        }
    };
};
export const createLateEarylyRequest = (
    data: ILateErlyComponentState,
    callBack?: (result: IRequestRes | IErrorAPIRes | null) => void,
    isLoad: boolean = true,
) => {
    return async (dispatch: Dispatch) => {
        if (isLoad) {
            dispatch(setLoader(true));
        }

        try {
            const res = await apiHelper.postRegisterLateErly(data);
            if (callBack) {
                callBack(res);
            }
        } catch (err) {
            if (!(err instanceof Error)) {
                const res = err as AxiosResponse<IErrorAPIRes, AxiosError>;
                if (callBack) {
                    callBack(res?.data);
                }
            }
        }

        if (isLoad) {
            dispatch(setLoader(false));
        }
    };
};

export const updateLateErylyRequest = (
    data: ILateErlyComponentState,
    callBack?: (result: IRequestRes | IErrorAPIRes | null) => void,
    isLoad: boolean = true,
) => {
    return async (dispatch: Dispatch) => {
        if (isLoad) {
            dispatch(setLoader(true));
        }

        try {
            const res = await apiHelper.updateRegisterLateErly(data);
            if (callBack) {
                callBack(res);
            }
        } catch (err) {
            if (!(err instanceof Error)) {
                const res = err as AxiosResponse<IErrorAPIRes, AxiosError>;
                if (callBack) {
                    callBack(res?.data);
                }
            }
        }

        if (isLoad) {
            dispatch(setLoader(false));
        }
    };
};

export const updateOvertimeCheck = (
    data: IOvertimeCheckComponentState,
    callBack?: (result: IRequestRes | IErrorAPIRes | null) => void,
    isLoad: boolean = true,
) => {
    return async (dispatch: Dispatch) => {
        if (isLoad) {
            dispatch(setLoader(true));
        }

        try {
            const res = await apiHelper.updateRegisterOvertime(data);
            if (callBack) {
                callBack(res);
            }
        } catch (err) {
            if (!(err instanceof Error)) {
                const res = err as AxiosResponse<IErrorAPIRes, AxiosError>;
                if (callBack) {
                    callBack(res?.data);
                }
            }
        }

        if (isLoad) {
            dispatch(setLoader(false));
        }
    };
};

export const createOvertimeCheck = (
    data: IOvertimeCheckComponentState,
    callBack?: (result: IRequestRes | IErrorAPIRes | null) => void,
    isLoad: boolean = true,
) => {
    return async (dispatch: Dispatch) => {
        if (isLoad) {
            dispatch(setLoader(true));
        }

        try {
            const res = await apiHelper.postRegisterOvertime(data);
            if (callBack) {
                callBack(res);
            }
        } catch (err) {
            if (!(err instanceof Error)) {
                const res = err as AxiosResponse<IErrorAPIRes, AxiosError>;
                if (callBack) {
                    callBack(res?.data);
                }
            }
        }

        if (isLoad) {
            dispatch(setLoader(false));
        }
    };
};

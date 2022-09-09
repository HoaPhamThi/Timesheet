interface ILoginDataAPI {
    email?: string;
    password?: string;
    access_token?: string;
    data?: object;
    id?: string;
}

interface ILoginAPIRes extends IBaseAPIRes {
    access_token?: string;
    session_id?: string;
    data?: ILoginDataAPI;
}

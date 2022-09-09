interface IHomeDataAPI {
    data?: IHomePageState;
}

interface IHomeAPIRes extends IBaseAPIRes {
    data?: IHomePageState;
    result?: IHomeDataAPI;
}

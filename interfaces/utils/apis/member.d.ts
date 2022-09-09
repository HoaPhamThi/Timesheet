interface IMemberDataAPI {
    data?: IEditProfileComponentState;
}

interface IMemberAPIRes extends IBaseAPIRes {
    data?: IEditProfileComponentState;
    result?: IMemberDataAPI;
}

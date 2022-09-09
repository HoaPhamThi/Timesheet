interface ILateErlyComponentProps extends IBaseCompProps {
    dataWorksheet?: IWorksheetDataAPI;
}

interface ILateErlyComponent<P = {}> extends IBaseComp<P> {}

interface ILateErlyComponentState extends IBaseCompState {
    date_cover_up?: any;
    reason?: string;
    registrationDate?: string;
    isDisabled?: boolean;
    typeRequest?: number;
    request_for_date?: any;
    overtime?: any;
    typeButton?: string;
    request_for_date?: any;
}

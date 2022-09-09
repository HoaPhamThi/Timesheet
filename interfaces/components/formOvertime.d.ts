interface IOvertimeCheckComponentState {
    checkin?: any;
    checkout?: any;
    request_ot_time?: any;
    request_for_date?: any;
    reason?: string;
    actualOvertime?: any;
    typeRequest?: number;
    registrationDate?: any;
    isValidate?: boolean;
    isDisabled?: boolean;
    typeButton?: string;
}
interface IOvertimeCheckComponentProps extends IBaseCompProps {
    dataWorksheet?: IWorksheetDataAPI;
}

interface IOvertimeComponent<P = {}> extends IBaseComp<P> {}

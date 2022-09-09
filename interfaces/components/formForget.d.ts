interface IForgetCheckComponentState {
    checkin?: any;
    checkout?: any;
    registrationDate?: any;
    checkboxChecked?: string[];
    isValidate?: boolean;
    reason?: string;
    request_for_date?: any;
    isDisabled?: boolean;
    typeButton?: string;
    special_reason?: number | null;
    s_reason?: number | null;
}
interface IForgetCheckComponentProps extends IBaseCompProps {
    idDate?: number;
    typeRequest?: number;
    workDay?: string;
}
interface IForgetCheckComponent<P = {}> extends IBaseComp<P> {}

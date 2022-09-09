interface IRegisterLeaveComponentProps extends IBaseCompProps {}

interface IRegisterLeaveComponent<P = {}> extends IBaseComp<P> {}

interface IRegisterLeaveComponentState extends IBaseCompState {
    registrationDate?: string;
    registerForDate?: string;
    checkinOriginal?: string;
    checkoutOriginal?: string;
    workTime?: string;
    lackTime?: string;
    leaveAllDay: string[];
    from?: any;
    to?: any;
    radioChecked?: string;
    timeCount?: string;
    reason: string;
    isDisabled?: boolean;
}

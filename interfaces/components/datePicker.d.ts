interface IDatePickerComponentProps extends IBaseCompProps {
    selected?: Date | null | undefined;
    handleOnChange?: (value: Date) => void | undefined;
    minDate?: Date;
    maxDate?: Date;
    disabled?: boolean;
    className?: string;
    showTimeSelect?: boolean;
    showTimeSelectOnly?: boolean;
    timeIntervals?: number;
    dateFormat?: string;
    placeholderText?: string;
    timeFormat?: string;
    type?: string;
    showYear?: boolean;
}

interface IDatePickerComponent<P = {}> extends IBaseComp<P> {}

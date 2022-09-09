import { images } from '@utils/constants';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const DatePickerComponent: IDatePickerComponent<IDatePickerComponentProps> = (props) => {
    const {
        className,
        selected,
        handleOnChange,
        maxDate,
        minDate,
        dateFormat,
        timeFormat,
        placeholderText,
        disabled,
        showTimeSelect,
        showTimeSelectOnly,
        timeIntervals,
        type,
        showYear,
    } = props;

    const Image = () => {
        return (
            <span className="open-button bases__p--cursor">
                <button type="button">
                    <img src={images.ICON_CALENDAR} alt="" className="bases__width20px " />
                </button>
            </span>
        );
    };

    return (
        <div className="components__datepicker datepicker-container ">
            <div className="datepicker-container">
                <DatePicker
                    className={className}
                    selected={selected}
                    dateFormat={dateFormat}
                    onChange={handleOnChange}
                    minDate={minDate}
                    maxDate={maxDate}
                    disabled={disabled}
                    timeFormat={timeFormat}
                    placeholderText={placeholderText}
                    showTimeSelect={showTimeSelect}
                    showTimeSelectOnly={showTimeSelectOnly}
                    timeIntervals={timeIntervals}
                    showYearDropdown={showYear}
                    dropdownMode="select"
                />
                {type === 'datepicker' ? <Image /> : <></>}
            </div>
        </div>
    );
};
DatePickerComponent.defaultProps = {
    className: 'custom-datepicker',
    showTimeSelect: false,
    showTimeSelectOnly: false,
    dateFormat: 'dd-MM-yyyy',
    timeIntervals: 5,
    maxDate: new Date(),
    showYear: true,
};
export default DatePickerComponent;

import { createRef, useState } from 'react';

import Validator from '@components/commons/Validator';
import Input from '@components/commons/Input';
import Choice from '@components/commons/Choice';
import Button from '@components/commons/Button';
import DatePickerComponent from '../commons/DatePicker';

import { useDispatch } from 'react-redux';
import { setModal } from '@redux/actions';

import { getCurrentDate } from '@utils/helpers/date';
import { useTrans } from '@utils/hooks';
import { validateHelper } from '@utils/helpers';
import { enums } from '@utils/constants';

const RegisterLeaveForm: IRegisterLeaveComponent<IRegisterLeaveComponentProps> = () => {
    const trans = useTrans();
    const dispatch = useDispatch();
    const reasonValidatorRef = createRef<IValidatorComponentHandle>();
    const rangeFromValidatorRef = createRef<IValidatorComponentHandle>();
    const rangeToValidatorRef = createRef<IValidatorComponentHandle>();

    const [state, setState] = useState<IRegisterLeaveComponentState>({
        registrationDate: getCurrentDate('YYYY-MM-DD HH:mm'),
        registerForDate: getCurrentDate('YYYY-MM-DD'),
        checkinOriginal: '08:30',
        checkoutOriginal: '08:30',
        workTime: '07:00',
        lackTime: '01:00',
        leaveAllDay: [],
        from: '',
        to: '',
        timeCount: '00:30',
        reason: '',
        isDisabled: false,
    });
    const {
        isDisabled,
        registrationDate,
        registerForDate,
        checkinOriginal,
        checkoutOriginal,
        workTime,
        lackTime,
        leaveAllDay,
        from,
        to,
        radioChecked,
        timeCount,
        reason,
    } = state;

    const handleOnChange = (field: string, value: Date | string | number | null) => {
        setState((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const handleSubmitRegisterLeave = () => {
        let isValidate = true;

        reasonValidatorRef?.current?.onValidateMessage('');
        if (validateHelper.isEmpty(from ?? '')) {
            reasonValidatorRef?.current?.onValidateMessage(trans.common.no_options);
            isValidate = false;
        }

        rangeFromValidatorRef?.current?.onValidateMessage('');
        rangeToValidatorRef?.current?.onValidateMessage('');
        if (validateHelper.isEmpty(from ?? '')) {
            rangeFromValidatorRef?.current?.onValidateMessage(trans.common.no_options);
            isValidate = false;
        }
        if (validateHelper.isEmpty(to ?? '')) {
            rangeToValidatorRef?.current?.onValidateMessage(trans.common.no_options);
            isValidate = false;
        } else if (!validateHelper.isValidTimeRange(from, to)) {
            rangeFromValidatorRef?.current?.onValidateMessage(trans.form_register_leave.invalid);
            rangeToValidatorRef?.current?.onValidateMessage(trans.form_register_leave.invalid);
            isValidate = false;
        }

        if (isValidate) {
        }
    };

    const handleCancelForm = () => {
        if (window.confirm('Do you want to close this modal?')) {
            dispatch(
                setModal({
                    isShow: false,
                }),
            );
        }
    };
    const handleGetValueRadio = (value: string[]) =>
        setState((prevState) => ({
            ...prevState,
            radioChecked: value[0],
        }));

    return (
        <div className="components__modal-leave">
            <div className="row mb-2">
                <div className="col-sm-3">{trans.form_register_leave.registration_date}:</div>
                <div className="col-sm-9">{registrationDate}</div>
            </div>

            <div className="row mb-2">
                <div className="col-sm-3">{trans.form_register_leave.register_for_date}:</div>
                <div className="col-sm-9">{registerForDate}</div>
            </div>

            <div className="row mb-2">
                <div className="col-sm-3">{trans.form_register_leave.checkin}:</div>
                <div className="col-sm-2">{checkinOriginal}</div>
                <div className="col-sm-2">{trans.form_register_leave.checkout}:</div>
                <div className="col-sm-5">{checkoutOriginal}</div>
            </div>

            <div className="row mb-2">
                <div className="col-sm-3">{trans.form_register_leave.work_time}:</div>
                <div className="col-sm-2">{workTime}</div>
                <div className="col-sm-2">{trans.form_register_leave.lack_time}:</div>
                <div className="col-sm-5">{lackTime}</div>
            </div>

            <div className="row mb-2">
                <div className="col">
                    <Choice
                        type="checkbox"
                        data={[
                            {
                                id: 'check_3',
                                label: 'Leave all day',
                                value: 'true',
                            },
                        ]}
                        onChange={(value: string[]) =>
                            setState((prevState) => ({
                                ...prevState,
                                leaveAllDay: value,
                                isDisabled: !prevState.isDisabled,
                                from: null,
                                to: null,
                            }))
                        }
                        checked={leaveAllDay}
                    />
                </div>
            </div>

            <div className="row mb-2">
                <div className="col-sm-3">{trans.form_register_leave.range}:</div>
                <div className="col-sm-2 bases__width12">
                    <Validator ref={rangeFromValidatorRef}>
                        <DatePickerComponent
                            selected={from}
                            dateFormat="HH:mm"
                            placeholderText="HH:mm"
                            handleOnChange={(value: Date) => handleOnChange('from', value)}
                            showTimeSelect={true}
                            showTimeSelectOnly={true}
                            timeIntervals={5}
                            className="w-100"
                            disabled={isDisabled}
                        />
                    </Validator>
                </div>
                <div className="col-sm-1 px-0 bases__width2">
                    <div className="py-1">{trans.form_register_leave.to}</div>
                </div>
                <div className="col-sm-2 bases__width12">
                    <Validator ref={rangeToValidatorRef}>
                        <DatePickerComponent
                            className="w-100"
                            selected={to}
                            placeholderText="HH:mm"
                            dateFormat="HH:mm"
                            handleOnChange={(value: Date) => handleOnChange('to', value)}
                            showTimeSelect={true}
                            showTimeSelectOnly={true}
                            timeIntervals={5}
                            disabled={isDisabled}
                        />
                    </Validator>
                </div>
                <div className="col-sm-3 d-flex ">
                    <Choice
                        data={[
                            {
                                id: 'radio_paid',
                                label: 'Paid',
                                value: enums.LEAVETYPE.PAID.toString(),
                            },
                            {
                                id: 'radio_un_paid',
                                label: 'Unpaid',
                                value: enums.LEAVETYPE.UNPAID.toString(),
                            },
                        ]}
                        onChange={handleGetValueRadio}
                        checked={[radioChecked as string]}
                    />
                </div>
                <div className="col-sm-2">
                    {trans.form_register_leave.time_count}: <span className="inline bases__text--bold">{timeCount}</span>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-sm-3">{trans.form_register_leave.reason}:</div>
                <div className="col-sm-9">
                    <Validator ref={reasonValidatorRef}>
                        <Input
                            name="email"
                            rows={5}
                            type="textarea"
                            maxLength={100}
                            value={reason}
                            onChange={(value: string) => handleOnChange('reason', value)}
                        />
                    </Validator>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="d-flex justify-content-end">
                        <Button className="cancel-btn" buttonText="Cancel" onClick={handleCancelForm} />
                        <Button className="submit-btn bases__margin--left30" buttonText="Register" onClick={handleSubmitRegisterLeave} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterLeaveForm;

import { setModal } from '@redux/actions';
import { createRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useTrans } from '@utils/hooks';
import { validateHelper } from '@utils/helpers';

import Validator from '@components/commons/Validator';
import Button from '../commons/Button';
import Input from '../commons/Input';
import DatePickerComponent from '../commons/DatePicker';
import { createOvertimeCheck, fetchRequest, updateOvertimeCheck } from '@redux/actions/api';
import { http, images } from '@utils/constants';
import { getCurrentDate } from '@utils/helpers/date';
import moment from 'moment';

const Overtime: IOvertimeComponent<IOvertimeCheckComponentProps> = (props) => {
    const trans = useTrans();
    const dispatch = useDispatch();

    const [state, setState] = useState<IOvertimeCheckComponentState>({
        reason: '',
        typeRequest: 5,
        isDisabled: false,
        typeButton: 'Edit',
    });

    const { dataWorksheet } = props;
    const { registrationDate, reason, request_ot_time, typeRequest, isDisabled, request_for_date, typeButton, checkin, checkout } = state;

    const time_minus = moment('10:00', 'HH:mm');
    const in_office = moment(dataWorksheet?.in_office, 'HH:mm');
    const hours = moment.duration(in_office.diff(time_minus));
    const actual_overtime = moment.utc(+hours).format('HH:mm');

    const reasonValidatorRef = createRef<IValidatorComponentHandle>();
    const requestOTValidatorRef = createRef<IValidatorComponentHandle>();
    useEffect(() => {
        dispatch(
            fetchRequest(dataWorksheet?.id ?? 0, typeRequest ?? 5, (result: IRequestRes | IErrorAPIRes | null) => {
                if (result?.code === http.SUCCESS_CODE) {
                    setState((pre) => ({
                        ...pre,
                        checkin: dataWorksheet?.checkin === null ? dataWorksheet?.checkin_original : dataWorksheet?.checkin,
                        checkout: dataWorksheet?.checkout === null ? dataWorksheet?.checkout_original : dataWorksheet?.checkout,

                        reason: (result?.data as IRequestRes).data?.reason ?? '',
                        registrationDate:
                            moment((result?.data as IRequestRes).data?.created_at).format('DD-MM-YYYY HH:mm') ??
                            getCurrentDate('DD-MM-YYYY HH:mm'),
                        request_ot_time:
                            (result?.data as IRequestRes).data?.request_ot_time === undefined
                                ? null
                                : new Date(`2022-01-01 ${(result?.data as IRequestRes).data?.request_ot_time}`),
                        request_for_date: (result?.data as IRequestRes).data?.request_for_date,

                        isDisabled: dataWorksheet?.work_date === (result?.data as IRequestRes).data?.request_for_date ? true : false,
                    }));
                }
            }),
        );
    }, [dataWorksheet?.id, typeRequest]);

    const submitForm = async () => {
        reasonValidatorRef?.current?.onValidateMessage('');
        if (validateHelper.isEmpty(reason ?? '')) {
            reasonValidatorRef?.current?.onValidateMessage('Empty');
            setState((prevState) => ({
                ...prevState,
                isValidate: false,
            }));
        }
        requestOTValidatorRef?.current?.onValidateMessage('');
        if (validateHelper.isEmpty(request_ot_time ?? '')) {
            requestOTValidatorRef?.current?.onValidateMessage('Empty');
            setState((prevState) => ({
                ...prevState,
                isValidate: false,
            }));
        } else if (!validateHelper.isValidTimeRange(request_ot_time, actual_overtime)) {
            requestOTValidatorRef?.current?.onValidateMessage(trans.form_register_overtime.errorTime);
            setState((prevState) => ({
                ...prevState,
                isValidate: false,
            }));
        } else {
            const data = {
                reason,
                request_for_date: dataWorksheet?.work_date,
                request_ot_time: moment(request_ot_time).format('HH:mm'),
                checkin: moment(checkin).format('HH:mm'),
                checkout: moment(checkout).format('HH:mm'),
            };
            dispatch(
                createOvertimeCheck(data, (result: IRequestRes | IErrorAPIRes | null) => {
                    if (result?.code === http.SUCCESS_CODE) {
                        dispatch(
                            setModal({
                                isShow: true,
                                isHideTitle: true,
                                content: (
                                    <div className="text-center">
                                        <span>
                                            {result?.data?.message}
                                            <img src={images.ICON_SUCCESS} className="bases__padding--left10 " />
                                        </span>
                                    </div>
                                ),
                                isHideButtons: true,
                                closeOnOutsiteClick: true,
                            }),
                        );
                    } else {
                        alert('update err');
                    }
                }),
            );
        }
    };

    const handleClose = () => {
        if (window.confirm('Do you want to close this modal?')) {
            dispatch(
                setModal({
                    isShow: false,
                }),
            );
        }
    };
    const handleOnChange = (field: string, value: Date | string | number | null) => {
        setState((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const funtionEditData = (type: string) => {
        switch (type) {
            case 'Edit':
                setState((prevState) => ({
                    ...prevState,
                    isDisabled: false,
                    typeButton: 'Update',
                }));
                break;
            case 'Update':
                const data = {
                    reason,
                    request_for_date,
                    request_ot_time: moment(request_ot_time).format('HH:mm'),
                };
                dispatch(
                    updateOvertimeCheck(data, (result: IRequestRes | IErrorAPIRes | null) => {
                        if (result?.code === http.SUCCESS_CODE) {
                            dispatch(
                                setModal({
                                    isShow: true,
                                    isHideTitle: true,
                                    content: (
                                        <div className="text-center">
                                            <span>
                                                {result?.data?.message}
                                                <img src={images.ICON_SUCCESS} className="bases__padding--left10 " />
                                            </span>
                                        </div>
                                    ),
                                    isHideButtons: true,
                                    closeOnOutsiteClick: true,
                                }),
                            );
                        } else {
                            alert('update err');
                        }
                    }),
                );
                break;

            default:
                break;
        }
    };
    const handleCancelEdit = () => {
        setState((prevState) => ({
            ...prevState,
            isDisabled: true,
            typeButton: 'Edit',
        }));
    };
    return (
        <div className="components__register-ot bases__text--semi-bold container">
            <div className="form-group mb-3">
                <div className="row">
                    <span className="col-3 bases__width16">{trans.form_register_overtime.registrationDate}</span>
                    <span className="col-9"> {registrationDate}</span>
                </div>
            </div>
            <div className="form-group mb-3">
                <div className="row">
                    <span className="col-3 bases__width16">{trans.form_register_overtime.otDate}</span>
                    <span className="col-9"> {moment(dataWorksheet?.work_date).format('DD-MM-YYYY')}</span>
                </div>
            </div>

            <div className="form-group mb-3 ">
                <div className="row">
                    <span className="col-3 bases__width16"> {trans.form_register_overtime.checkin}</span>
                    <span className="col-3">
                        {' '}
                        {dataWorksheet?.checkin === null
                            ? moment(dataWorksheet?.checkin_original).format('HH:mm')
                            : moment(dataWorksheet?.checkin).format('HH:mm')}
                    </span>
                    <span className="col-3 bases__width14">{trans.form_register_overtime.checkout}</span>

                    <span className="col-3">
                        {' '}
                        {dataWorksheet?.checkout === null
                            ? moment(dataWorksheet?.checkout_original).format('HH:mm')
                            : moment(dataWorksheet?.checkout).format('HH:mm')}
                    </span>
                </div>
            </div>

            <div className="form-group mb-3">
                <div className="row">
                    <span className="col-3 bases__width16"> {trans.form_register_overtime.requestOT}</span>
                    <div className="col-3 d-grid ">
                        <Validator className="w-50" ref={requestOTValidatorRef}>
                            <DatePickerComponent
                                dateFormat="HH:mm"
                                timeFormat="HH:mm"
                                placeholderText="HH:mm"
                                showTimeSelectOnly={true}
                                showTimeSelect={true}
                                selected={request_ot_time}
                                handleOnChange={(value: Date) => handleOnChange('request_ot_time', value)}
                                timeIntervals={5}
                                disabled={isDisabled}
                            />
                        </Validator>
                    </div>
                    <span className="col-3 bases__width14">{trans.form_register_overtime.actualOvertime}</span>
                    <span className="col-3">{actual_overtime}</span>
                </div>
            </div>

            <div className="form-group mb-2 ">
                <div className="row">
                    <span className="col-3 col-form-label bases__text--bold"> {trans.form_register_overtime.note}</span>
                    <div className="text-note">
                        {trans.form_register_overtime.textnote}
                        <p> {trans.form_register_overtime.exampleNote} </p>
                        Thời gian request OT <span className="bases__text--red"> không lớn hơn</span> thời gian Overtime Actual. Các trường
                        hợp OT khi remote cần yêu cầu qua email.
                    </div>
                </div>
            </div>

            <div className="form-group mb-2 ">
                <div className="row">
                    <span className="col-3 col-form-label">
                        {trans.form_register_overtime.reason}
                        <span className="bases__text--red">{trans.form_register_overtime.importance}</span>
                    </span>
                    <div className="col">
                        <Validator ref={reasonValidatorRef}>
                            <Input
                                name="reason"
                                type="textarea"
                                placeholder="không quá 100 ký tự"
                                maxLength={100}
                                rows={5}
                                value={reason}
                                onChange={(value: string) => handleOnChange('reason', value)}
                                disabled={isDisabled}
                            />
                        </Validator>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    {dataWorksheet?.work_date === request_for_date ? (
                        <>
                            <div className="d-flex justify-content-end">
                                <Button className="cancel-btn" buttonText="Cancel" onClick={handleCancelEdit} />
                                <Button
                                    className="submit-btn bases__margin--left30"
                                    buttonText={typeButton}
                                    onClick={() => funtionEditData(typeButton as string)}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="d-flex justify-content-end">
                            <Button className="cancel-btn" buttonText="Cancel" onClick={handleClose} />
                            <Button className="submit-btn bases__margin--left30" buttonText={'Register'} onClick={submitForm} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Overtime;

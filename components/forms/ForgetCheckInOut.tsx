import React, { createRef, useEffect, useState } from 'react';
import { useTrans } from '@utils/hooks';

import Input from '../commons/Input';
import Choice from '../commons/Choice';
import Button from '../commons/Button';
import { validateHelper } from '@utils/helpers';
import { useDispatch } from 'react-redux';
import { setModal } from '@redux/actions';
import Validator from '@components/commons/Validator';
import DatePickerComponent from '../commons/DatePicker';
import { createForgetCheck, fetchRequest, updateForgetCheck } from '@redux/actions/api';
import { enums, http, images } from '@utils/constants';
import { getCurrentDate } from '@utils/helpers/date';
import moment from 'moment';

const ForgetCheckForm: IForgetCheckComponent<IForgetCheckComponentProps> = (props) => {
    const [state, setState] = useState<IForgetCheckComponentState>({
        isValidate: true,
        isDisabled: false,
        typeButton: 'Edit',
        special_reason: 3,
    });
    const {
        checkin,
        checkout,
        checkboxChecked,
        reason,
        registrationDate,
        request_for_date,
        isDisabled,
        typeButton,
        special_reason,
        s_reason,
    } = state;
    const { typeRequest, idDate, workDay } = props;
    const checkInValidatorRef = createRef<IValidatorComponentHandle>();
    const checkOutValidatorRef = createRef<IValidatorComponentHandle>();
    const reasonValidatorRef = createRef<IValidatorComponentHandle>();

    const trans = useTrans();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            fetchRequest(idDate ?? 0, typeRequest ?? 1, (result: IRequestRes | IErrorAPIRes | null) => {
                if (result?.code === http.SUCCESS_CODE) {
                    setState((pre) => ({
                        ...pre,
                        reason: (result?.data as IRequestRes).data?.reason ?? '',
                        request_for_date: (result?.data as IRequestRes).data?.request_for_date,
                        checkin:
                            (result?.data as IRequestRes).data?.checkin === null
                                ? null
                                : new Date((result?.data as IRequestRes).data?.checkin),
                        checkout:
                            (result?.data as IRequestRes).data?.checkout === null
                                ? null
                                : new Date((result?.data as IRequestRes).data?.checkout),
                        registrationDate: (result?.data as IRequestRes).data?.created_at ?? getCurrentDate('YYYY-MM-DD HH:mm'),
                        checkboxChecked:
                            (result?.data as IRequestRes).data?.special_reason === null
                                ? [' ']
                                : (result?.data as IRequestRes).data?.special_reason === 1
                                ? ['1']
                                : (result?.data as IRequestRes).data?.special_reason === 2
                                ? ['2']
                                : (result?.data as IRequestRes).data?.special_reason === 3
                                ? ['1', '2']
                                : checkboxChecked,
                        isDisabled: workDay === (result?.data as IRequestRes).data?.request_for_date ? true : false,
                        s_reason: (result?.data as IRequestRes).data?.special_reason,
                    }));
                }
            }),
        );
    }, [idDate, typeRequest]);

    const handleOnChange = (field: string, value: Date | string | number | any | null) => {
        setState((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };
    const handleOnClose = () => {
        if (window.confirm('Do you want to close this modal?')) {
            dispatch(
                setModal({
                    isShow: false,
                }),
            );
        }
    };
    const getValueSpecialReason = (value: string[]) =>
        setState((prevState) => ({
            ...prevState,
            checkboxChecked: value,
            special_reason: value?.toString() === '1' ? 1 : value?.toString() === '2' ? 2 : value?.toString() === '1,2' ? 3 : 0,
        }));

    const submitForm = async () => {
        reasonValidatorRef?.current?.onValidateMessage('');
        checkInValidatorRef?.current?.onValidateMessage('');
        checkOutValidatorRef?.current?.onValidateMessage('');
        if (validateHelper.isEmpty(checkin ?? '')) {
            checkInValidatorRef?.current?.onValidateMessage(trans.common.no_options);
            setState((prevState) => ({
                ...prevState,
                isValidate: false,
            }));
        }
        if (validateHelper.isEmpty(checkout ?? '')) {
            checkOutValidatorRef?.current?.onValidateMessage(trans.common.no_options);
            setState((prevState) => ({
                ...prevState,
                isValidate: false,
            }));
        }
        if (!validateHelper.isValidTimeRange(checkin, checkout)) {
            checkInValidatorRef?.current?.onValidateMessage(trans.common.invalid);
            checkOutValidatorRef?.current?.onValidateMessage(trans.common.invalid);
            setState((prevState) => ({
                ...prevState,
                isValidate: false,
            }));
        }
        if (validateHelper.isEmpty(reason ?? '')) {
            reasonValidatorRef?.current?.onValidateMessage(trans.common.no_options);
            setState((prevState) => ({
                ...prevState,
                isValidate: false,
            }));
        } else {
            const data = {
                checkin: moment(checkin).format('HH:mm'),
                checkout: moment(checkout).format('HH:mm'),
                reason,
                special_reason: Number(special_reason),
                request_for_date: workDay,
            };
            dispatch(
                createForgetCheck(data, (result: IRequestRes | IErrorAPIRes | null) => {
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

    const funtionEditData = (type: string) => {
        switch (type) {
            case 'Edit':
                setState((prevState) => ({
                    ...prevState,
                    isDisabled: !prevState.isValidate,
                    typeButton: 'Update',
                }));
                break;
            case 'Update':
                const data = {
                    checkin: moment(checkin).format('HH:mm'),
                    checkout: moment(checkout).format('HH:mm'),
                    reason,
                    special_reason: Number(special_reason) == null ? s_reason : Number(special_reason),
                    request_for_date: workDay,
                };
                dispatch(
                    updateForgetCheck(data, (result: IRequestRes | IErrorAPIRes | null) => {
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
        <>
            <div className="components__register-forget container">
                <div className="form-group mb-1">
                    <div className="row">
                        <div className="col-3">
                            <span className="col-form-label">{trans.form_forget_check.register_date_title}:</span>
                        </div>
                        <div className="col-9">
                            <span> {moment(registrationDate as string).format('DD-MM-YYYY HH:mm') ?? registrationDate} </span>
                        </div>
                    </div>
                </div>

                <div className="form-group mb-1">
                    <div className="row">
                        <div className="col-3">
                            <span className="col-form-label">{trans.form_forget_check.register_for_date_title}:</span>
                        </div>
                        <div className="col-9">
                            <span> {moment(request_for_date).format('DD-MM-YYYY') ?? moment(workDay).format('DD-MM-YYYY')} </span>
                        </div>
                    </div>
                </div>

                <div className="row mb-1">
                    <div className="col-3">
                        <span className="col-form-label">
                            {trans.form_forget_check.check_in_title}:<span className="text-danger">(*)</span>
                        </span>
                    </div>
                    <div className="col-4 align-items-center bases__width10">
                        <Validator ref={checkInValidatorRef}>
                            <DatePickerComponent
                                dateFormat="HH:mm"
                                timeFormat="HH:mm"
                                placeholderText="HH:mm"
                                selected={checkin}
                                handleOnChange={(value: Date) => handleOnChange('checkin', value)}
                                showTimeSelect={true}
                                showTimeSelectOnly={true}
                                timeIntervals={5}
                                disabled={isDisabled}
                            />
                        </Validator>
                    </div>
                </div>
                <div className="row mb-1">
                    <div className="col-3">
                        <span className="col-form-label">
                            {trans.form_forget_check.check_out_title}:<span className="text-danger">(*)</span>
                        </span>
                    </div>
                    <div className="col-4 align-items-center bases__width10">
                        <Validator ref={checkOutValidatorRef}>
                            <DatePickerComponent
                                dateFormat="HH:mm"
                                timeFormat="HH:mm"
                                placeholderText="HH:mm"
                                selected={checkout}
                                handleOnChange={(value: Date) => handleOnChange('checkout', value)}
                                showTimeSelect={true}
                                showTimeSelectOnly={true}
                                timeIntervals={5}
                                disabled={isDisabled}
                            />
                        </Validator>
                    </div>
                </div>

                <div className="form-group mb-1">
                    <div className="row">
                        <div className="col-3">
                            <span className="col-form-label">{trans.form_forget_check.special_reason_title}:</span>
                        </div>
                        <div className="col-9 d-flex bases__font--15">
                            <Choice
                                type="checkbox"
                                data={[
                                    {
                                        id: 'check-in',
                                        label: trans.form_forget_check.check_in_error_msg,
                                        value: enums.SPECIAL_REASON.ERORR_CHECK_IN.toString(),
                                    },
                                    {
                                        id: 'check-out',
                                        label: trans.form_forget_check.check_out_error_msg,
                                        value: enums.SPECIAL_REASON.ERORR_CHECK_OUT.toString(),
                                    },
                                ]}
                                onChange={getValueSpecialReason}
                                checked={checkboxChecked}
                                disabled={isDisabled}
                            />
                        </div>
                    </div>
                </div>

                <div className="row mb-1">
                    <div className="col-3">
                        <span className="col-form-label">
                            {trans.form_forget_check.reason_title}
                            <span className="text-danger">(*)</span>
                        </span>
                    </div>
                    <div className="col-9">
                        <Validator ref={reasonValidatorRef}>
                            <Input
                                name="reason"
                                rows={7}
                                type="textarea"
                                maxLength={100}
                                value={reason}
                                onChange={(value: string) => handleOnChange('reason', value)}
                                disabled={isDisabled}
                            />
                        </Validator>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {workDay === request_for_date ? (
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
                                <Button className="cancel-btn" buttonText="Cancel" onClick={handleOnClose} />
                                <Button className="submit-btn bases__margin--left30" buttonText={'Register'} onClick={submitForm} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgetCheckForm;

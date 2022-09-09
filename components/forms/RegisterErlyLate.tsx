import DatePickerComponent from '@components/commons/DatePicker';
import Validator from '@components/commons/Validator';
import { setModal } from '@redux/actions';
import { createLateEarylyRequest, fetchRequest, updateLateErylyRequest } from '@redux/actions/api';
import { http, images } from '@utils/constants';
import { validateHelper } from '@utils/helpers';
import { getCurrentDate } from '@utils/helpers/date';
import { useTrans } from '@utils/hooks';
import moment from 'moment';
import { createRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input } from '..';

const RegisterErlyLate: ILateErlyComponent<ILateErlyComponentProps> = (props) => {
    const trans = useTrans();
    const dispatch = useDispatch();
    const [state, setState] = useState<ILateErlyComponentState>({
        reason: '',
        typeRequest: 4,
        isDisabled: true,
        typeButton: 'Edit',
    });
    const { dataWorksheet } = props;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const { date_cover_up, reason, registrationDate, typeRequest, overtime, isDisabled, typeButton, request_for_date } = state;
    const reasonValidatorRef = createRef<IValidatorComponentHandle>();
    const dateCoverUpValidatorRef = createRef<IValidatorComponentHandle>();

    const time_minus = moment('09:00', 'HH:mm');
    const in_office = moment(dataWorksheet?.in_office, 'HH:mm');
    const hours = in_office > time_minus ? moment.duration(in_office.diff(time_minus)) : moment.duration(time_minus.diff(in_office));
    const over_time = moment.utc(+hours).format('HH:mm');

    useEffect(() => {
        dispatch(
            fetchRequest(dataWorksheet?.id ?? 0, typeRequest ?? 4, (result: IRequestRes | IErrorAPIRes | null) => {
                if (result?.code === http.SUCCESS_CODE) {
                    setState((pre) => ({
                        ...pre,
                        reason: (result?.data as IRequestRes).data?.reason ?? '',
                        registrationDate:
                            moment((result?.data as IRequestRes).data?.created_at).format('DD-MM-YYYY HH:mm') ??
                            getCurrentDate('DD-MM-YYYY HH:mm'),
                        date_cover_up:
                            (result?.data as IRequestRes).data?.compensation_date === undefined
                                ? null
                                : new Date((result?.data as IRequestRes).data?.compensation_date),
                        isDisabled: dataWorksheet?.work_date === (result?.data as IRequestRes).data?.request_for_date ? true : false,
                        overtime: over_time,
                        request_for_date:
                            (result?.data as IRequestRes).data?.request_for_date ?? moment(dataWorksheet?.work_date).format('DD-MM-YYYY'),
                    }));
                }
            }),
        );
    }, [dataWorksheet?.id, typeRequest]);

    const submitForm = async () => {
        let isValidate = true;

        reasonValidatorRef?.current?.onValidateMessage('');
        if (validateHelper.isEmpty(reason ?? '')) {
            reasonValidatorRef?.current?.onValidateMessage('Empty');
            isValidate = false;
        }
        dateCoverUpValidatorRef?.current?.onValidateMessage('');
        if (validateHelper.isEmpty(date_cover_up ?? '')) {
            dateCoverUpValidatorRef?.current?.onValidateMessage('Empty');
            isValidate = false;
        }
        if (isValidate) {
            const data = {
                reason,
                request_for_date: dataWorksheet?.work_date,
                date_cover_up: moment(date_cover_up).format('YYYY/MM/DD'),
                overtime,
            };
            dispatch(
                createLateEarylyRequest(data, (result: IRequestRes | IErrorAPIRes | null) => {
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
                        alert(result?.data?.message);
                    }
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
    const handleClose = () => {
        if (window.confirm('Do you want to close this modal?')) {
            dispatch(
                setModal({
                    isShow: false,
                }),
            );
        }
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
                    request_for_date: dataWorksheet?.work_date,
                    date_cover_up: moment(date_cover_up).format('YYYY/MM/DD'),
                    overtime,
                };
                dispatch(
                    updateLateErylyRequest(data, (result: IRequestRes | IErrorAPIRes | null) => {
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
        if (window.confirm('Do you want to close this modal?')) {
            setState((prevState) => ({
                ...prevState,
                isDisabled: true,
                typeButton: 'Edit',
            }));
        }
    };
    return (
        <div className="components__register-ot bases__text--semi-bold container">
            <div className="form-group mb-3">
                <div className="row">
                    <span className="col-3 bases__width15">{trans.form_erly_late.register_date_title}</span>
                    <span className="col-9"> {registrationDate}</span>
                </div>
            </div>
            <div className="form-group mb-3">
                <div className="row">
                    <span className="col-3  bases__width15">{trans.form_erly_late.register_for_date_title}</span>
                    <span className="col-9"> {request_for_date}</span>
                </div>
            </div>

            <div className="form-group mb-3">
                <div className="row">
                    <span className="col-3 bases__width15"> {trans.form_erly_late.check_in_title}</span>
                    <span className="col-3">
                        {' '}
                        {dataWorksheet?.checkin === null
                            ? moment(dataWorksheet?.checkin_original).format('HH:mm')
                            : moment(dataWorksheet?.checkin).format('HH:mm')}
                    </span>
                    <span className="col-3 bases__width10">{trans.form_erly_late.check_out_title}</span>
                    <span className="col-3">
                        {dataWorksheet?.checkout === null
                            ? moment(dataWorksheet?.checkout_original).format('HH:mm')
                            : moment(dataWorksheet?.checkout).format('HH:mm')}
                    </span>
                </div>
            </div>

            <div className="form-group mb-3">
                <div className="row">
                    <span className="col-3 bases__width15"> {trans.form_erly_late.late_time_title}</span>
                    <div className="col-3">{dataWorksheet?.late ?? ' '}</div>
                    <span className="col-3 bases__width10">{trans.form_erly_late.early_time_title}</span>
                    <span className="col-3">{dataWorksheet?.early ?? ' '}</span>
                </div>
            </div>
            <div className="form-group mb-3">
                <div className="row">
                    <span className="col-3 bases__width15">
                        {trans.form_erly_late.date_cover_up_title}
                        <span className="bases__text--red">{trans.form_register_overtime.importance}</span>
                    </span>
                    <div className="col-3 d-grid  ">
                        <Validator className="bases__width60" ref={dateCoverUpValidatorRef}>
                            <DatePickerComponent
                                maxDate={yesterday}
                                minDate={new Date(dataWorksheet?.work_date)}
                                type="datepicker"
                                dateFormat="dd-MM-yyyy"
                                selected={date_cover_up}
                                handleOnChange={(value: Date) => handleOnChange('date_cover_up', value)}
                                disabled={isDisabled}
                            />
                        </Validator>
                    </div>
                    <div className="col-5 ">
                        <span>
                            {trans.form_erly_late.overtime_title} <span className="bases__text--bold">{overtime}</span> &nbsp;| &nbsp;
                        </span>
                        <span>
                            {trans.form_erly_late.time_request}{' '}
                            <span className="bases__text--bold">{dataWorksheet?.early ?? dataWorksheet?.late}</span>
                        </span>
                    </div>
                </div>
            </div>

            <div className="form-group mb-2 ">
                <div className="row">
                    <span className="col-3 col-form-label bases__width15">
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

export default RegisterErlyLate;

import ForgetCheckForm from '@components/forms/ForgetCheckInOut';
import RegisterLeaveForm from '@components/forms/Leave';
import Overtime from '@components/forms/Overtime';
import Table from '@components/commons/Table';
import { fetchWorksheet, setModal } from '@redux/actions';
import { useTrans } from '@utils/hooks';
import { createRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import RegisterErlyLate from '@components/forms/RegisterErlyLate';
import SearchWorksheetForm from '@components/forms/SearchWorksheet';
import { http } from '@utils/constants';
import moment from 'moment';
import { validateHelper } from '@utils/helpers';

const Worksheet: IWorksheetComponent<IWorksheetComponentProps> = () => {
    const tableRef = createRef<ITableComponentHandle>();
    const dispatch = useDispatch();
    const trans = useTrans();
    const [state, setState] = useState<IWorksheetComponentState>({
        worksheet: [],
        meta: {},
        page: 1,
        perpage: 30,
        isSort: ' ',
        typeSearch: '1',
        list_month: 'this_month',
        month: '',
    });
    const { worksheet, meta, page, perpage, isSort, typeSearch, queryStart, queryEnd, startDate, endDate, month, list_month, typeRequest } =
        state;
    const startDateValidatorRef = createRef<IValidatorComponentHandle>();
    const endDateValidatorRef = createRef<IValidatorComponentHandle>();
    const options = [
        {
            value: `30`,
            label: `30`,
        },
        {
            value: `50`,
            label: `50`,
        },
        {
            value: `100`,
            label: `100`,
        },
    ];

    useEffect(() => {
        dispatch(
            fetchWorksheet(
                page ?? 1,
                perpage ?? 30,
                isSort ?? ' ',
                startDate ?? ' ',
                endDate ?? ' ',
                month ?? ' ',
                (result: IWorksheetAPIRes | IErrorAPIRes | null) => {
                    if (result?.code === http.SUCCESS_CODE) {
                        setState((pre) => ({
                            ...pre,
                            worksheet: (result.data as IWorksheetAPIRes).data,
                            meta: (result.data as IWorksheetAPIRes).meta,
                        }));
                    }
                },
            ),
        );
    }, [page, perpage, isSort, startDate, endDate, month]);
    const handleTableDatas = () => {
        return worksheet?.map((data, index) => {
            const date: any = moment(data.work_date as string).format('ddd DD-MM-YYYY  ');
            const checkinOriginal: any = moment(data.checkin_original as string).format('HH:mm');
            const checkoutOriginal: any = moment(data.checkout_original as string).format('HH:mm');
            const checkin: any = moment(data.checkin as string).format('HH:mm');
            const checkout: any = moment(data.checkout as string).format('HH:mm');
            return {
                ...data,
                No: `${index + 1} `,
                Date: `${date}`,
                Late: [
                    {
                        value: `${data.late ? data.late : '  '}`,
                        disabled: true,
                        readOnly: true,
                        className: `${data.checkin ? 'bases__highlight--black ' : ' bases__highlight--red'}`,
                    },
                ],
                Early: [
                    {
                        value: `${data.early ? data.early : ' '}`,
                        disabled: true,
                        readOnly: true,
                        className: `${data.checkout ? 'bases__highlight--black ' : ' bases__highlight--red'}`,
                    },
                ],
                In_Office: `${data.in_office ? data.in_office : ' '}`,
                OT: `${data.ot_time ? data.ot_time : '00:00'}`,
                Checkin: `${data.checkin ? checkin : data.checkin_original ? checkinOriginal : '--:--'}`,
                Checkout: `${data.checkout ? checkout : data.checkout_original ? checkoutOriginal : '--:--'}`,
                Work_Time: `${data.work_time ? data.work_time : ' '}`,
                Lack: `${data.lack ? data.lack : ' '}`,
                Comp: `${data.compensation ? data.compensation : ' '}`,
                Pleave: `${data.paid_leav ? data.paid_leav : ' '}`,
                Uleave: `${data.unpaid_leave ? data.unpaid_leave : ' '}`,
                Note: `${'Late/Erly: sent '}`,
                // Note: `${data.note ? data.note : ' '}`,
                action_btn: {
                    buttonItems: [{ text: 'Forget' }, { text: 'Late/Erly' }, { text: 'Leave' }, { text: 'Overtime' }],
                    className: 'components__table-btn_list',
                    onClick: async (value: string) => {
                        switch (value) {
                            case 'forget':
                                setState((pre) => ({
                                    ...pre,
                                    typeRequest: 1,
                                }));
                                dispatch(
                                    setModal({
                                        size: 'xl',
                                        isShow: true,
                                        title: 'Forget',
                                        isHideButtons: true,
                                        content: (
                                            <>
                                                <div className="title-request">{trans.modal_request.forget} </div>
                                                <ForgetCheckForm idDate={data.id} typeRequest={typeRequest} workDay={data.work_date} />
                                            </>
                                        ),
                                    }),
                                );

                                break;
                            case 'late/erly':
                                dispatch(
                                    setModal({
                                        size: 'xl',
                                        isShow: true,
                                        title: 'Late/Erly',
                                        isHideButtons: true,
                                        content: (
                                            <>
                                                <div className="title-request"> {trans.modal_request.late_erly} </div>
                                                <RegisterErlyLate dataWorksheet={data} />
                                            </>
                                        ),
                                    }),
                                );
                                break;
                            case 'leave':
                                dispatch(
                                    setModal({
                                        size: 'xl',
                                        isShow: true,
                                        title: 'Leave',
                                        isHideButtons: true,
                                        content: (
                                            <>
                                                <div className="title-request">{trans.modal_request.leave} </div>
                                                <RegisterLeaveForm />
                                            </>
                                        ),
                                    }),
                                );
                                break;
                            case 'overtime':
                                dispatch(
                                    setModal({
                                        size: 'xl',
                                        isShow: true,
                                        title: 'Overtime',
                                        isHideButtons: true,
                                        content: (
                                            <>
                                                <div className="title-request">{trans.modal_request.overtime} </div>
                                                <Overtime dataWorksheet={data} />
                                            </>
                                        ),
                                    }),
                                );
                                break;

                            default:
                                break;
                        }
                    },
                },
            };
        });
    };

    const onChangePage = (value: number) => {
        setState((pre) => ({
            ...pre,
            page: value,
        }));
    };

    const handleOnChangeSelect = (value: number) => {
        setState((prevState) => ({
            ...prevState,
            perpage: value,
        }));
    };

    const handleGetValue = (value: string) => {
        setState((prevState) => ({
            ...prevState,
            isSort: value,
        }));
    };
    const handleStartDate = (date: any) => {
        setState((prevState) => ({
            ...prevState,
            queryStart: date,
        }));
    };
    const handleEndDate = (date: any) => {
        setState((prevState) => ({
            ...prevState,
            queryEnd: date,
        }));
    };
    const handleGetTypeSearch = (value: string[]) => {
        setState((prevState) => ({
            ...prevState,
            typeSearch: value[0],
        }));
    };
    const handleSelectListMont = (value: string) => {
        setState((prevState) => ({
            ...prevState,
            list_month: value,
        }));
    };
    const handleSearch = () => {
        if (typeSearch === '1') {
            setState((prevState) => ({
                ...prevState,
                month: list_month,
                startDate: ' ',
                endDate: ' ',
            }));
        } else {
            let isValidate = true;
            startDateValidatorRef?.current?.onValidateMessage('');
            endDateValidatorRef?.current?.onValidateMessage('');
            if (validateHelper.isEmpty(queryStart ?? '')) {
                startDateValidatorRef?.current?.onValidateMessage('Empty');
                isValidate = false;
            }
            if (validateHelper.isEmpty(queryEnd ?? '')) {
                endDateValidatorRef?.current?.onValidateMessage('Empty');
                isValidate = false;
            }
            if (!validateHelper.isValidTimeRange(queryStart, queryEnd)) {
                endDateValidatorRef?.current?.onValidateMessage('The end date must be greater than the start date');
                isValidate = false;
            }
            if (isValidate) {
                setState((prevState) => ({
                    ...prevState,
                    month: ' ',
                    startDate: moment(queryStart).format('YYYY-MM-DD'),
                    endDate: moment(queryEnd).format('YYYY-MM-DD'),
                }));
            }
        }
    };
    const resetValue = () => {
        setState((prevState) => ({
            ...prevState,
            isSort: ' ',
            typeSearch: '1',
            queryStart: null,
            queryEnd: null,
            month: ' ',
        }));
    };
    const table = {
        heads: [
            {
                title: 'No',
                className: 'text-center',
            },
            {
                title: 'Date',
                className: 'text-center',
            },
            {
                title: 'Check in',
                className: 'text-center',
            },
            {
                title: 'Check out',
                className: 'text-center',
            },
            {
                title: 'Late',
                className: 'text-center',
            },
            {
                title: 'Early',
                className: 'text-center',
            },
            {
                title: 'In Office',
                className: 'text-center',
            },
            {
                title: 'OT',
                className: 'text-center',
            },
            {
                title: 'Work Time',
                className: 'text-center ',
            },
            {
                title: 'Lack',
                className: 'text-center',
            },
            {
                title: 'Comp',
                className: 'text-center',
            },
            {
                title: 'Pleave',
                className: 'text-center',
            },
            {
                title: 'Uleave',
                className: 'text-center',
            },
            {
                title: 'Note',
                className: 'text-center ',
            },
            {
                title: 'Action',
                className: 'text-center bases__width150px',
            },
        ],
        body: {
            columns: [
                {
                    field: 'No',
                    className: 'text-center ',
                },
                {
                    field: 'Date',
                    className: 'text-center',
                },
                {
                    field: 'Checkin',
                    className: 'text-center',
                },
                {
                    field: 'Checkout',
                    className: 'text-center',
                },
                {
                    field: 'Late',
                    className: 'text-center',
                    isInput: true,
                },
                {
                    field: 'Early',
                    className: 'text-center',
                    isInput: true,
                },
                {
                    field: 'In_Office',
                    className: 'text-center',
                },
                {
                    field: 'OT',
                    className: 'text-center',
                },
                {
                    field: 'Work_Time',
                    className: 'text-center',
                },
                {
                    field: 'Lack',
                    className: 'text-center',
                },
                {
                    field: 'Comp',
                    className: 'text-center',
                },
                {
                    field: 'Pleave',
                    className: 'text-center',
                },
                {
                    field: 'Uleave',
                    className: 'text-center',
                },
                {
                    field: 'Note',
                    className: 'text-center ',
                },
                {
                    field: 'action_btn',
                    className: 'd-flex bases__padding--left2',
                    isListButton: true,
                },
            ],
            rows: handleTableDatas(),
        },
    };

    return (
        <>
            <div className="components__worksheet container">
                <SearchWorksheetForm
                    handleGetValue={(value: string) => handleGetValue(value)}
                    sort={isSort}
                    handleSearch={handleSearch}
                    typeSearch={typeSearch}
                    handleGetTypeSearch={(value: string[]) => handleGetTypeSearch(value)}
                    handleStartDate={handleStartDate}
                    handleEndDate={handleEndDate}
                    queryStart={queryStart}
                    queryEnd={queryEnd}
                    resetValue={resetValue}
                    validateStart={startDateValidatorRef}
                    validateEnd={endDateValidatorRef}
                    handleSelectListMont={handleSelectListMont}
                    list_month={list_month}
                />
                <Table
                    className="table-worksheet"
                    ref={tableRef}
                    heads={table.heads}
                    body={table.body}
                    total={meta?.total as number}
                    valueOption={options}
                    onChangePage={(value: number) => {
                        onChangePage(value);
                    }}
                    perPageprop={perpage}
                    onChangeSelect={(value: any) => handleOnChangeSelect(value)}
                />
            </div>
        </>
    );
};

export default Worksheet;

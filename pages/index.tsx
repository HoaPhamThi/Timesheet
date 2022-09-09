import { DetailNotice, Table } from '@components/index';

import { useTrans } from '@utils/hooks';

import { createRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchNotice, setModal } from '@redux/actions';
import { http } from '@utils/constants';

const HomePage: IHomePage<IHomePageProps> = () => {
    const trans = useTrans();
    const dispatch = useDispatch();
    const tableRef = createRef<ITableComponentHandle>();
    const [state, setState] = useState<IHomePageState>({
        notice: [],
        meta: {},
        isSort: true,
        isSortDown: false,
        sort: 'asc',
        page: 1,
        perpage: 10,
    });
    const { notice, meta, sort, isSort, page, perpage, isSortDown } = state;

    const options = [
        {
            value: `10`,
            label: `10`,
        },
        {
            value: `20`,
            label: `20`,
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
            fetchNotice(sort ?? 'asc', page ?? 1, perpage ?? 10, (result: INoticeAPIRes | IErrorAPIRes | null) => {
                if (result?.code === http.SUCCESS_CODE) {
                    setState((pre) => ({
                        ...pre,
                        notice: (result?.data as INoticeAPIRes).data,
                        meta: (result.data as IWorksheetAPIRes).meta,
                    }));
                }
            }),
        );
    }, [sort, page, perpage]);
    useEffect(() => {}, [notice]);

    const handleSort = () => {
        setState((pre) => ({
            ...pre,
            isSort: !isSort,
            isSortDown: !isSortDown,
        }));
        if (isSort) {
            setState((pre) => ({
                ...pre,
                sort: 'desc',
            }));
        } else {
            setState((pre) => ({
                ...pre,
                sort: 'asc',
            }));
        }
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

    const handleTableDatas = () => {
        return notice?.map((data, index) => {
            const publicshed_data =
                typeof data.published_to === 'string'
                    ? 'ALL'
                    : data?.published_to?.map((item) => {
                          return item.division_name;
                      });

            return {
                ...data,
                No: `${index + 1}`,
                Subject: `${data.subject}`,
                Author: `${data.created_by ? data.created_by : 'ADMIN'}`,
                To_Deparment: `${publicshed_data}`,
                Published_Date: `${data.published_date}`,
                Attachment: {
                    className: 'components__table-btn_link float-start',
                    buttonText: `${data.attachment}`,
                    title: `${data.attachment}`,
                    onClick: () => {
                        window.open(data.attachment);
                    },
                },
                detail_btn: {
                    buttonText: 'View',
                    className: 'components__table-btn_link',
                    onClick: () => {
                        dispatch(
                            setModal({
                                size: 'lg',
                                isShow: true,
                                title: trans.form_detail_notice.title,
                                isHideButtons: true,
                                content: (
                                    <>
                                        <DetailNotice subject={data.subject} attachment={data.attachment} message={data.message} />
                                    </>
                                ),
                            }),
                        );
                    },
                },
            };
        });
    };
    const table = {
        heads: [
            {
                title: 'No',
                className: 'text-center',
            },
            {
                title: 'Subject',
            },
            {
                title: 'Author',
                className: 'text-center',
            },
            {
                title: 'To Deparment',
                className: 'text-center',
            },
            {
                title: 'Published Date',
                className: 'text-center',
                isSort: true,
                isSortDown: true,

                onclick: () => handleSort(),
            },
            {
                title: 'Attachment',
            },
            {
                title: 'Detail',
                className: 'text-center',
            },
        ],
        body: {
            columns: [
                {
                    field: 'No',
                    className: 'text-center',
                },
                {
                    field: 'Subject',
                },
                {
                    field: 'Author',
                    className: 'text-center',
                },
                {
                    field: 'To_Deparment',
                    className: 'text-center',
                },
                {
                    field: 'Published_Date',
                    className: 'text-center',
                },
                {
                    field: 'Attachment',
                    isButton: true,
                },
                {
                    field: 'detail_btn',
                    isButton: true,
                },
            ],
            rows: handleTableDatas(),
        },
    };

    return (
        <div className="pages__home container">
            <div>{trans.home.title}</div>
            <h4>Official Notice</h4>
            <Table
                ref={tableRef}
                total={meta?.total as number}
                heads={table.heads}
                body={table.body}
                valueOption={options}
                handleSort={handleSort}
                sort={sort}
                onChangePage={(value: number) => {
                    onChangePage(value);
                }}
                perPageprop={perpage}
                onChangeSelect={(value: any) => handleOnChangeSelect(value)}
            />
        </div>
    );
};

export default HomePage;

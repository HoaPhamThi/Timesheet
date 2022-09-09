interface INoticeDataAPI {
    id?: number;
    subject?: string;
    created_by?: string;
    published_to?: [
        {
            division_name?: string;
        },
    ];
    published_date?: any;
    attachment?: string;
    message?: string;
}

interface INoticeAPIRes extends IBaseAPIRes {
    data?: INoticeDataAPI[];
}

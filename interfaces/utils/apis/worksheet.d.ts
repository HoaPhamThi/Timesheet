interface IWorksheetDataAPI {
    id: number;
    member_id?: number;
    work_date?: any;
    checkin?: any;
    checkin_original?: string;
    checkout?: any;
    checkout_original?: string;
    late?: string;
    early?: string;
    in_office?: string;
    ot_time?: string;
    work_time?: string;
    lack?: string;
    compensation?: string;
    paid_leav?: string;
    unpaid_leave?: string;
    note?: string;
}
interface IWorksheetAPIRes extends IBaseAPIRes {
    data?: IWorksheetDataAPI[];
    meta?: {
        total?: number;
    };
}

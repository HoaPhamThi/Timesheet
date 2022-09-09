interface IRequestDataAPI {
    id?: number;
    member_id?: number;
    request_type?: number;
    request_for_date?: any;
    checkin?: any;
    checkout?: any;
    compensation_time?: any;
    compensation_date?: any;
    leave_all_day?: number;
    leave_start?: any;
    leave_end?: any;
    leave_time?: any;
    request_ot_time?: any;
    reason?: string;
    status?: number;
    manager_confirmed_status?: number;
    manager_confirmed_at?: any;
    manager_confirmed_comment?: string;
    admin_approved_status?: number;
    admin_approved_at?: any;
    admin_approved_comment?: string;
    error_count?: number;
    special_reason?: number | null;
    created_at?: any;
    updated_at?: any;
    deleted_at?: any;
    message?: string;
    compensation_time?: any;
    compensation_date?: any;
    request_ot_time?: any;
}
interface IRequestRes extends IBaseAPIRes {
    data?: IRequestDataAPI;
}

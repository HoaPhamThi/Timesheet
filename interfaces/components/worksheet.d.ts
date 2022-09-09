interface IWorksheetComponentProps extends IBaseCompProps {}

interface IWorksheetComponent<P = {}> extends IBaseComp<P> {}

interface IWorksheetComponentState {
    worksheet?: IWorksheetDataAPI[];
    meta?: {
        total?: number;
    };
    page?: number;
    perpage?: number;
    isSort?: string;
    typeSearch?: any;
    startDate?: any;
    endDate?: any;
    queryStart?: any;
    queryEnd?: any;
    list_month?: string;
    month?: string;
    typeRequest?: number;
}

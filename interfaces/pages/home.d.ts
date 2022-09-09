interface IHomePageProps extends IBasePageProps {}

interface IHomePage<P = {}> extends IBasePage<P> {}
interface IHomePageState {
    notice?: INoticeDataAPI[];
    meta?: {
        total?: number;
    };
    sort?: string;
    isSort?: boolean;

    isSortDown?: boolean;

    page?: number;
    perpage?: number;
}

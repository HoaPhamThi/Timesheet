interface INoticeComponentProps extends IBaseCompProps {
    message?: string;
    attachment?: string;
    subject?: string;
}

interface INoticeComponent<P = {}> extends IBaseComp<P> {}

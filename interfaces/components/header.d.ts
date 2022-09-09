interface IHeaderComponentProps extends IBaseCompProps {}

interface IHeaderComponent<P = {}> extends IBaseComp<P> {}

interface IHeaderComponentState extends IBaseCompState {
    full_name?: string;
}

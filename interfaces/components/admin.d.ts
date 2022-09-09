interface IAdminComponentProps extends IBaseCompProps {}

interface IAdminComponent<P = {}> extends IBaseComp<P> {}

interface IAdminComponentState extends IBaseCompState {
    approve: string;
    sent: string;
}

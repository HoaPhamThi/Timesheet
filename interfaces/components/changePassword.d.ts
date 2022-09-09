interface IChangePasswordComponentProps extends IBaseCompProps {}

interface IChangePasswordComponent<P = {}> extends IBaseComp<P> {}

interface IChangePasswordComponentState extends IBaseCompState {
    old_password: string;
    new_password: string;
    new_password_confirmation: string;
    access_token?: string;
}
interface IChangePassWordRes extends IBaseAPIRes {
    message?: string;
    access_token?: string;
    success?: boolean;
}

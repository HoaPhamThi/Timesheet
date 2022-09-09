interface IModalReduxData {
    isShow: boolean;
    title?: string;
    content?: JSX.Element;
    closeOnOutsiteClick?: boolean;
    onClose?: () => void;
    isHideButtons?: boolean;
    isHideTitle?: boolean;
    buttonText?: string;
    cancelText?: string;
    size?: 'sm' | 'lg' | 'xl';
}

interface IModalReduxAction {
    type: string;
    data: IModalReduxData;
}

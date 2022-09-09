interface IButtonComponentProps extends IBaseCompProps {
    borderColor?: string;
    background?: string;
    textColor?: string;
    className?: string;
    fontSize?: string;
    disabled?: boolean;
    startIcon?: string;
    endIcon?: string;
    buttonText?: string;
    onClick?: (id?: any) => void;
    onEndIconClick?: () => void;
    fontWeight?: string;
    iconColor?: string;
    textClassName?: string;
    iconSize?: number;
    contentMode?: 'wrap' | 'nowrap';
    dataType?: string;
    title?: string;
}

interface IButtonComponent<P = {}> extends IBaseComp<P> {}

interface IProfileInfoComponent<P = {}> extends IBaseComp<P> {}

interface IProfileInfoComponentProps extends IBaseCompProps {
    official_avatar?: string;
    avatar?: string;
    handleChangeAvatar?: (e: any) => void;
    handleChangeOfficialAvatar?: (e: eny) => void;
    officialAvatarValidatorRef?: any;
    avatarValidatorRef?: any;
}

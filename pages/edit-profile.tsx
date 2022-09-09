import { EditProfileForm } from '@components/index';
import { IEditProfilePageProps, IEditProfilePage } from '@interfaces/pages/editProfile';

const EditProfilePage: IEditProfilePage<IEditProfilePageProps> = () => {
    return (
        <div className="pages__editProfile container">
            <EditProfileForm />
        </div>
    );
};

export default EditProfilePage;

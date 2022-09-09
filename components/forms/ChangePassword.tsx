import { createRef, useState } from 'react';

import Button from '../commons/Button';
import Validator from '../commons/Validator';
import Input from '../commons/Input';

import { useTrans } from '../../utils/hooks';
import { validateHelper } from '../../utils/helpers';
import { fetchChangePassWord } from '@redux/actions/api';

import { useDispatch } from 'react-redux';
import { setModal } from '@redux/actions';
import { images } from '@utils/constants';

const ChangePasswordForm: IChangePasswordComponent<IChangePasswordComponentProps> = () => {
    const trans = useTrans();
    const dispatch = useDispatch();
    const [state, setState] = useState<IChangePasswordComponentState>({
        old_password: '',
        new_password: '',
        new_password_confirmation: '',
    });
    const { old_password, new_password, new_password_confirmation } = state;
    const oldPasswordValidatorRef = createRef<IValidatorComponentHandle>();
    const newPasswordValidatorRef = createRef<IValidatorComponentHandle>();
    const confirmPasswordValidatorRef = createRef<IValidatorComponentHandle>();

    const handleOnChange = (field: string, value: string | number | null) => {
        setState((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const handleSubmitChangePassword = async () => {
        let isValidate = true;

        oldPasswordValidatorRef?.current?.onValidateMessage('');
        if (validateHelper.isEmpty(old_password ?? '')) {
            oldPasswordValidatorRef?.current?.onValidateMessage(trans.common.no_options);
            isValidate = false;
        } else if ((old_password ?? '').length < 6) {
            oldPasswordValidatorRef?.current?.onValidateMessage(trans.changePassWord.password_check_characters);
            isValidate = false;
        }

        newPasswordValidatorRef?.current?.onValidateMessage('');
        if (validateHelper.isEmpty(new_password ?? '')) {
            newPasswordValidatorRef?.current?.onValidateMessage(trans.common.no_options);
            isValidate = false;
        } else if ((new_password ?? '').length < 6) {
            newPasswordValidatorRef?.current?.onValidateMessage(trans.changePassWord.password_check_characters);
            isValidate = false;
        } else if (new_password === old_password) {
            newPasswordValidatorRef?.current?.onValidateMessage(trans.changePassWord.password_different_old_password);
            isValidate = false;
        }

        confirmPasswordValidatorRef?.current?.onValidateMessage('');
        if (validateHelper.isEmpty(new_password_confirmation ?? '')) {
            confirmPasswordValidatorRef?.current?.onValidateMessage(trans.common.no_options);
            isValidate = false;
        } else if (new_password_confirmation !== new_password) {
            confirmPasswordValidatorRef?.current?.onValidateMessage(trans.changePassWord.password_incorrect);
            isValidate = false;
        }

        if (isValidate) {
            dispatch(
                await fetchChangePassWord(state, (result: IChangePassWordRes | IErrorAPIRes | null) => {
                    if (result?.message === 'Old password is incorrect!') {
                        oldPasswordValidatorRef?.current?.onValidateMessage('Old password is incorrect!');
                        isValidate = false;
                    } else {
                        dispatch(
                            setModal({
                                isShow: true,
                                isHideTitle: true,
                                content: (
                                    <div className="text-center">
                                        <span>
                                            {result?.message}
                                            <img src={images.ICON_SUCCESS} className="bases__padding--left10 " />
                                        </span>
                                    </div>
                                ),
                                isHideButtons: true,
                                closeOnOutsiteClick: true,
                            }),
                        );
                    }
                }),
            );
        }
    };

    return (
        <div className="components__changePasswordForm">
            <div className="mb-3">
                <div className="label">
                    {trans.changePassWord.old_password} <span className="bases__text--red">(*)</span>{' '}
                </div>
                <Validator ref={oldPasswordValidatorRef}>
                    <Input
                        name="password"
                        type="password"
                        className="py-2"
                        value={old_password}
                        placeholder={trans.changePassWord.enter_old_password}
                        onChange={(value: string) => handleOnChange('old_password', value)}
                    />
                </Validator>
            </div>
            <div className="mb-3">
                <div className="label">
                    {trans.changePassWord.new_password}
                    <span className="bases__text--red">(*)</span>
                </div>
                <Validator ref={newPasswordValidatorRef}>
                    <Input
                        name="password"
                        type="password"
                        className="py-2"
                        value={new_password}
                        placeholder={trans.changePassWord.enter_new_password}
                        onChange={(value: string) => handleOnChange('new_password', value)}
                    />
                </Validator>
            </div>
            <div className="mb-3">
                <div className="label">
                    {trans.changePassWord.confirm_password}
                    <span className="bases__text--red">(*)</span>
                </div>
                <Validator ref={confirmPasswordValidatorRef}>
                    <Input
                        name="password"
                        type="password"
                        className="py-2"
                        value={new_password_confirmation}
                        placeholder={trans.changePassWord.enter_new_password}
                        onChange={(value: string) => handleOnChange('new_password_confirmation', value)}
                    />
                </Validator>
            </div>
            <Button
                className="components__changePasswordForm-btn py-2"
                buttonText={trans.changePassWord.change_password}
                onClick={handleSubmitChangePassword}
            />
        </div>
    );
};

export default ChangePasswordForm;

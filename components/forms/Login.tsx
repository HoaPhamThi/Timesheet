import Button from '@components/commons/Button';
import Img from '@components/commons/Img';
import Input from '@components/commons/Input';
import Validator from '@components/commons/Validator';
import { fetchLogin, setModal } from '@redux/actions';
import { images } from '@utils/constants';
import { validateHelper } from '@utils/helpers';
import { useTrans } from '@utils/hooks';
import { useRouter } from 'next/router';
import { createRef, useState } from 'react';
import { useDispatch } from 'react-redux';
const LoginForm: ILoginComponent<ILoginComponentProps> = () => {
    const trans = useTrans();
    const dispatch = useDispatch();
    const router = useRouter();
    const [state, setState] = useState<ILoginComponentState>({
        email: '',
        password: '',
    });
    const { email, password } = state;
    const emailValidatorRef = createRef<IValidatorComponentHandle>();
    const passwordValidatorRef = createRef<IValidatorComponentHandle>();

    const submitForm = async () => {
        let isValidate = true;

        emailValidatorRef?.current?.onValidateMessage('');
        if (validateHelper.isEmpty(email ?? '')) {
            emailValidatorRef?.current?.onValidateMessage(`${trans.empty.email}`);
            isValidate = false;
        } else if (!validateHelper.isEmail(email ?? '')) {
            emailValidatorRef?.current?.onValidateMessage(`${trans.common.email}`);
            isValidate = false;
        }

        passwordValidatorRef?.current?.onValidateMessage('');
        if (validateHelper.isEmpty(password ?? '')) {
            passwordValidatorRef?.current?.onValidateMessage(`${trans.empty.password}`);
            isValidate = false;
        } else if ((password ?? '').length < 6 || (password ?? '').length > 16) {
            passwordValidatorRef?.current?.onValidateMessage(`${trans.common.password}`);
            isValidate = false;
        }

        if (isValidate) {
            dispatch(
                await fetchLogin(
                    state,
                    () => {
                        router.reload();
                    },
                    (error?: IErrorAPIRes) => {
                        dispatch(
                            setModal({
                                isShow: true,
                                title: trans.common.login_failed,
                                content: (
                                    <div>
                                        <p>{error?.message}</p>
                                    </div>
                                ),
                                buttonText: trans.common.ok,
                                size: 'sm',
                                isHideButtons: true,
                            }),
                        );
                    },
                ),
            );
        }
    };

    const handleOnChange = (field: string, value: string | number | null) => {
        setState((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    return (
        <div className="pages__login container d-flex">
            <Img className="pages__login-img" width={600} height={400} src={images.LOGIN} />
            <div className=" pages__login-form  ">
                <h2 className="pages__login-form_heading">{trans.login.Sign_into}</h2>
                <div className="pages__login-form_input">
                    <div className="float-start">{trans.login.email}</div>
                    <Validator ref={emailValidatorRef}>
                        <Input
                            name="email"
                            type="text"
                            value={email}
                            placeholder="Enter email"
                            onChange={(value: string) => handleOnChange('email', value)}
                        />
                    </Validator>
                </div>
                <div className="pages__login-form_input">
                    <div className="float-start">{trans.login.password}</div>
                    <Validator ref={passwordValidatorRef}>
                        <Input
                            name="password"
                            type="password"
                            value={password}
                            placeholder="Enter password"
                            onChange={(value: string) => handleOnChange('password', value)}
                        />
                    </Validator>
                </div>

                <Button className="pages__login-form_btn py-2 w-100" onClick={() => submitForm()} buttonText="Login" />
            </div>
        </div>
    );
};

export default LoginForm;

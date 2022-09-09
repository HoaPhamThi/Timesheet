import { fetchMemberDetail, setModal } from '@redux/actions';
import { http, routes } from '@utils/constants';
import { authHelper } from '@utils/helpers';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import ChangePasswordForm from '../forms/ChangePassword';
const Header: IHeaderComponent<IHeaderComponentProps> = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const logout = () => {
        if (window.confirm('You really want to sign out ?')) {
            authHelper.logOut();
            router.reload();
        }
    };
    const [state, setState] = useState<IEditProfileComponentState>({
        full_name: ' ',
    });
    const { full_name } = state;
    useEffect(() => {
        dispatch(
            fetchMemberDetail((result: IMemberAPIRes | IErrorAPIRes | null) => {
                if (result?.code === http.SUCCESS_CODE) {
                    setState((prevState) => ({
                        ...prevState,
                        full_name: (result?.data as IMemberAPIRes).data?.full_name ?? '',
                    }));
                } else {
                }
            }),
        );
    }, []);
    return (
        <div className="components__header">
            <Head>
                <title>Training Web</title>
                <link rel="icon" type="image/png" href="/favicon.ico" />
            </Head>
            <div className="container">
                <div className="d-flex align-items-center bases__margin--bottom12 justify-content-between">
                    <div>
                        <h2 color="blue">Relipa portal</h2>
                    </div>
                    <div className="d-flex justify-start mt-6 align-items-center">
                        <div className="heading-start">
                            Welcome
                            <span className="heading">{full_name}</span>
                        </div>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic"></Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick={() => {
                                        dispatch(
                                            setModal({
                                                isShow: true,
                                                title: 'change password',
                                                isHideButtons: true,
                                                content: <ChangePasswordForm />,
                                            }),
                                        );
                                    }}
                                >
                                    Change password
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => {
                                        router.push(
                                            {
                                                pathname: routes.CLIENT.PROFILE.href,
                                            },
                                            undefined,
                                            { scroll: false },
                                        );
                                    }}
                                >
                                    Edit profile
                                </Dropdown.Item>
                                <Dropdown.Item onClick={logout}>
                                    <strong>Logout</strong>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <div className="d-flex justify-start mt-6 ">
                    <div
                        className="heading"
                        onClick={() =>
                            router.push(
                                {
                                    pathname: routes.CLIENT.HOME.href,
                                },
                                undefined,
                                { scroll: false },
                            )
                        }
                    >
                        Home
                    </div>
                    <div
                        className="heading"
                        onClick={() =>
                            router.push(
                                {
                                    pathname: routes.CLIENT.WORKSHEET.href,
                                },
                                undefined,
                                { scroll: false },
                            )
                        }
                    >
                        Timesheet
                    </div>
                    <div className="heading-end"> My Leave </div>
                </div>
            </div>
        </div>
    );
};

export default Header;

import LoginForm from '@components/forms/Login';
import Header from '@components/layouts/Header';
import Loader from '@components/layouts/Loader';
import Modal from '@components/layouts/Modal';
import { setLocale, setModal } from '@redux/actions';
import { routes } from '@utils/constants';
import { authHelper } from '@utils/helpers';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const App: IAppComponent<IAppComponentProps> = (props) => {
    const { children } = props;
    const router = useRouter();
    const dispatch = useDispatch();
    const [state, setState] = useState<IAppComponentState>({
        reloadKey: 0,
        historyPathname: router.pathname,
    });

    const { reloadKey } = state;

    const { locale, pathname } = router;
    const checklogin = authHelper.isAuth();
    const checkNotFound = router.pathname !== routes.CLIENT.NOT_FOUND.href;

    useEffect(() => {
        window.addEventListener('popstate', onBackButtonEvent);

        return () => {
            window.removeEventListener('popstate', onBackButtonEvent);
        };
    }, []);

    useEffect(() => {
        window.addEventListener('popstate', onBackButtonEvent);

        return () => {
            window.removeEventListener('popstate', onBackButtonEvent);
        };
    }, []);

    useEffect(() => {
        handleScrollToTop();
        setState((prevState) => ({
            ...prevState,
            historyPathname: pathname,
        }));
    }, [pathname]);

    useEffect(() => {
        dispatch(setLocale(locale));
    }, [locale]);

    const onBackButtonEvent = () => {
        dispatch(setModal({ isShow: false }));
        handleScrollToTop();
    };

    const handleScrollToTop = () => {
        document.documentElement.style.scrollBehavior = 'auto';
        setTimeout(() => window.scrollTo(0, 0), 5);
    };

    return (
        <div key={reloadKey}>
            <Loader />
            <Modal />
            <Header />
                    {children}
                {/* </>
            ) : (
                <>
                    <LoginForm />
                </>
            )} */}
        </div>
    );
};

export default App;

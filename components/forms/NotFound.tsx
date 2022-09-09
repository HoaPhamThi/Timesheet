import React from 'react';
import Link from 'next/link';

const NotFound = () => {
    return (
        <div>
            <div className="d-flex justify-content-center pages__404">
                <div className="pages__404-err">404</div>

                <div className="pages__404-msg ">
                    Maybe this page moved?
                    <Link href="/">
                        <a className="pages__404-msg_link">Home</a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;

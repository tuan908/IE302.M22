import { PropsWithChildren, ReactNode } from 'react';
import Header from 'src/component/Header';

function DefaultLayout({ children }: PropsWithChildren<ReactNode>) {
    return (
        <>
            <Header />
            <div className="container">
                <div className="content">{children}</div>
            </div>
        </>
    );
}

export default DefaultLayout;

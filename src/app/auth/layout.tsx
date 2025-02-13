import {ReactNode} from 'react';
import {Metadata} from 'next';

export const metadata: Metadata = {
    title: 'Next.js | Auth'
};

type Props = { children: ReactNode }

const AuthLayout = ({ children }: Props ) => {
    return (
        <>
            {children}
        </>
    );
};

export default AuthLayout;
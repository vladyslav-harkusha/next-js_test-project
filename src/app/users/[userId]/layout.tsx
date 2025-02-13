import {ReactNode} from 'react';
import {Metadata} from 'next';

export const metadata: Metadata = {
    title: 'Next.js | User'
};

type Props = { children: ReactNode }

const UserLayout = ({ children }: Props ) => {
    return (
        <>
            {children}
        </>
    );
};

export default UserLayout;
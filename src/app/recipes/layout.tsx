import {ReactNode} from 'react';
import {Metadata} from 'next';

export const metadata: Metadata = {
    title: 'Next.js | Recipes'
};

type Props = { children: ReactNode }

const Layout = ({ children }: Props ) => {
    return (
        <>
            {children}
        </>
    );
};

export default Layout;
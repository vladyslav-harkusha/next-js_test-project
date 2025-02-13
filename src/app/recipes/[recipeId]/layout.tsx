import {ReactNode} from 'react';
import {Metadata} from 'next';

export const metadata: Metadata = {
    title: 'Next.js | Recipe'
};

type Props = { children: ReactNode }

const RecipeLayout = ({ children }: Props ) => {
    return (
        <>
            {children}
        </>
    );
};

export default RecipeLayout;
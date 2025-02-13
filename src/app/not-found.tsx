import Link from "next/link";
import './globals.scss';

export default function NotFoundPage() {
    return (
        <div className='not-found-container'>
            <h2>Page is not found</h2>
            <Link href={'/'} className='link-to-homepage'>Back to home page {'>>'}</Link>
        </div>
    );
};

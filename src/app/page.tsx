import './page.scss';
import Loader from "@/components/UI/loader/Loader";
import {cookies} from "next/headers";
import {urlEndpoints} from "@/constants/urlEndpoints";
import Link from "next/link";

export default async function IndexPage() {
    const cookieStore = await cookies();
    const authUserCookie = cookieStore.get('auth-user')?.value;

    return (
        <div className='home-page'>
            <h2 className='home-page-title'>Home page</h2>
            <p className='home-page-text'>
                This test application is created to practice <span>Next.js</span>, <span>TypeScript</span> and <span>React</span>
            </p>
            <Loader />

            {!authUserCookie &&
				<div className='need-to-login'>
					<p>You are not authorized, log in please:</p>
					<Link href={urlEndpoints.auth} className='link'>to Auth page</Link>
				</div>
            }
        </div>
    );
};

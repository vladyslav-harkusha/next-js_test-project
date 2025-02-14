import './page.scss';
import Loader from "@/components/UI/loader/Loader";

export default function IndexPage() {
    return (
        <div className='home-page'>
            <h2 className='home-page-title'>Home page</h2>
            <p className='home-page-text'>
                This test application is created to practice <span>Next.js</span>, <span>TypeScript</span> and <span>React</span>
            </p>
            <Loader />

            {/*{!authUser &&*/}
			{/*	<div className='need-to-login'>*/}
			{/*		<p>You are not authorized, log in please:</p>*/}
			{/*		<Link to={urlEndpoints.auth} className='link'>to Auth page</Link>*/}
			{/*	</div>*/}
            {/*}*/}
        </div>
    );
};

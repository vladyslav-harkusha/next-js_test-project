import './AuthPage.scss';
import {AuthForm} from "@/components/auth-form/AuthForm";

export default async function AuthPage() {
    return (
        <div className='auth-page'>
            <h2 className='auth-page-title'>Auth page</h2>
            <AuthForm />
            {/*{authUser*/}
            {/*    ? <LogOut authUser={authUser} />*/}
            {/*    : <AuthForm />*/}
            {/*}*/}
        </div>
    );
};

import './AuthPage.scss';
import {AuthForm} from "@/components/auth-form/AuthForm";
import {cookies} from "next/headers";
import {LogOut} from "@/components/log-out/LogOut";

export default async function AuthPage() {
    const cookieStore = await cookies();
    const authUserCookie = cookieStore.get('auth-user')?.value;

    const authUser = authUserCookie ? JSON.parse(authUserCookie) : null;

    return (
        <div className='auth-page'>
            <h2 className='auth-page-title'>Auth page</h2>
            {authUserCookie
                ? <LogOut authUser={authUser} />
                : <AuthForm />
            }
        </div>
    );
};

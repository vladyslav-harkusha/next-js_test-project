import './Header.scss';
import NavMenu from "@/components/nav-menu/NavMenu";
import {cookies} from "next/headers";
import AuthUserHeaderInfo from "@/components/auth-user-header-info/AuthUserHeaderInfo";
import ThemeSwitcher from "@/components/theme-switcher/ThemeSwitcher";

export default async function Header() {
    const cookieStore = await cookies();
    const authUserCookie = cookieStore.get('auth-user')?.value;

    const authUser = authUserCookie ? JSON.parse(authUserCookie) : null;

    return (
        <header className='app-header'>
            <NavMenu />
            <ThemeSwitcher />
            {authUserCookie && <AuthUserHeaderInfo authUser={authUser} />}
        </header>
    );
};

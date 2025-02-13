import './Header.scss';
import NavMenu from "@/components/nav-menu/NavMenu";

export default function Header() {

    return (
        <header className='app-header'>
            <NavMenu />
            {/*{authUser && <AuthUserHeaderInfo />}*/}
        </header>
    );
};

'use client';

import Link from "next/link";
import cn from 'classnames';
import {privateLinks, publicLinks} from "@/components/nav-menu/linksEndpoints";
import {usePathname} from "next/navigation";
import './NavMenu.scss';
import {useHasCookie} from "cookies-next";

export default function NavMenu() {
    const pathname = usePathname();
    const hasCookie = useHasCookie();

    const links = hasCookie('auth-user') ? privateLinks : publicLinks;

    const isLinkActive = (endpoint: string) =>
        endpoint === '/' ? pathname === '/' : pathname.startsWith(endpoint);

    return (
        <nav className='nav-menu'>
            <ul className='nav-list'>
                {links.map(({name, endpoint}, id) => (
                    <li key={id}>
                        <Link
                            href={endpoint}
                            className={cn('nav-link', { 'is-active-link': isLinkActive(endpoint) })}
                        >
                            {name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

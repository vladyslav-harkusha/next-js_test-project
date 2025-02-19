'use client';

import {useEffect, useState} from "react";
import './ThemeSwitcher.scss';
import MainButton from "@/components/UI/main-button/MainButton";

export default function ThemeSwitcher() {
    const [theme, setTheme] = useState<string>('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'dark') {
            document.documentElement.classList.add(savedTheme);
            setTheme(savedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        if (newTheme === 'light') document.documentElement.classList.remove('dark');
        document.documentElement.classList.add(newTheme);

        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const buttonText = theme === 'light' ? '🌙 Set dark theme' : '☀️ Set light theme';

    return (
        <div>
            <MainButton buttonText={buttonText} buttonOnclick={toggleTheme} />
        </div>
    );
};

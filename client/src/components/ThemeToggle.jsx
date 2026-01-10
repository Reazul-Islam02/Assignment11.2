import { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <label className="swap swap-rotate btn btn-ghost btn-circle hover:bg-base-200 transition-colors">
            {/* this hidden checkbox controls the state */}
            <input
                type="checkbox"
                onChange={toggleTheme}
                checked={theme === 'dark'}
            />

            {/* sun icon */}
            <FaSun className="swap-on text-2xl text-yellow-400" />

            {/* moon icon */}
            <FaMoon className="swap-off text-2xl text-primary" />
        </label>
    );
};

export default ThemeToggle;

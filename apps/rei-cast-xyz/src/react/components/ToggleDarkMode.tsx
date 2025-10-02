import { useState, useEffect } from 'react';

export const DarkModeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) root.classList.add('dark');
        else root.classList.remove('dark');
    }, [isDark]);

    return (
        <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded bg-gray-200 dark:bg-gray-700"
        >
            {isDark ? '🌙' : '☀️'}
        </button>
    );
};
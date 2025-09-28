// components/SideBar.tsx
import { ReactNode } from 'react';

interface SideBarProps {
    children: ReactNode;
}

export const SideBar: React.FC<SideBarProps> = ({ children }) => {
    return (
        <aside
            className="
        hidden md:flex     /* hidden by default, visible on md+ screens */
        flex-col
        w-64
        bg-gray-800
        text-white
        h-screen
        p-4
"
        >
            {children}
        </aside>
    );
};
// components/SideBar.tsx

import type { ReactNode } from "react";


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
        h-screen
        p-4

        SideBar
"
        >
            {children}
        </aside>
    );
};
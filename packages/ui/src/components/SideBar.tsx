// components/SideBar.tsx

import { type ReactNode } from "react";


interface SideBarProps {
    children: ReactNode;
}

export const SideBar = ({ children }: SideBarProps) => {
    return (
        <aside
            className="
        hidden md:flex
        flex-col
        w-64
        h-screen
        p-4

        SideBar

        fixed top-0 left-0
"
        >
            {children}
        </aside>
    );
};
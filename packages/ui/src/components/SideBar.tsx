// components/SideBar.tsx

import { type ReactNode } from "react";


interface SideBarProps {
    children: ReactNode;
}

export const SideBar = ({ children }: SideBarProps) => {
    return (
        <aside
            className="
        /* Mobile: sticky top bar in normal flow */
        sticky top-0 z-20 w-full h-12 box-border
        

        /* Desktop: sticky left rail */
        md:h-screen md:w-64 md:flex-none md:flex-col md:items-stretch md:py-4
        

        /* Layout */
        flex items-center px-4 py-2
        flex-shrink-0

        SideBar
"
        >
            {children}
        </aside>
    );
};
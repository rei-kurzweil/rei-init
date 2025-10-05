import { useState } from "react";

import { type ReactNode } from "react";

export function MobileTopBar(props: { 
    title: string;
    children?: ReactNode 
}) {
    const [menuOpen, setMenuOpen] = useState(false);
    
    return (
        <aside className="  fixed top-0 left-0 w-full h-16
                            flex md:hidden items-center justify-between
                            px-4 py-2 bg-white dark:bg-gray-800 SideBar">

            <span>
                {props.title}
            </span>

            <button onClick={() => setMenuOpen(!menuOpen)}>☰</button>
            
            {menuOpen && (
                <nav>
                        {props.children}
                </nav>
            )}
            
        </aside>
    );
}
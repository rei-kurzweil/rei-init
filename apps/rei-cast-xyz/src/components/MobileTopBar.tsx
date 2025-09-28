import { useState } from "react";
import { DarkModeToggle } from "./ToggleDarkMode";

export function MobileTopBar(props: { 
    title: string;
    children?: React.ReactNode 
}) {
    const [menuOpen, setMenuOpen] = useState(false);
    
    return (
        <aside className="hidden md:flex flex-col justify-between w-64 h-screen p-4 SideBar">
            
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
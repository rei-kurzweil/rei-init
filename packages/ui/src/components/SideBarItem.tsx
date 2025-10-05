
import { type ReactNode } from "react";

interface SideBarItemProps {
    value: string;
    icon?: ReactNode;
    href?: string;
}

export const SideBarItem = (props: SideBarItemProps) => {
    
    return (
        <a
            href={props.href}
            className="
        flex items-center gap-2
        p-2 rounded
        hover:bg-gray-700
        transition-colors
"
        >
            {props.icon}
            <span>{props.value}</span>
        </a>
    );
};

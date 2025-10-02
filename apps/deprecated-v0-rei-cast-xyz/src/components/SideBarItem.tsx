

interface SideBarItemProps {
    value: string;
    icon?: React.ReactNode;
    href?: string;
}

export const SideBarItem: React.FC<SideBarItemProps> = (props: 
    { 
        value: string; 
        icon?: React.ReactNode; 
        href?: string
    }) => {
    
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



interface SideBarItemProps {
    value: string;
    icon: React.ReactNode;
    href: string;
}

export const SideBarItem: React.FC<SideBarItemProps> = (
    { 
        value = 'item', 
        icon  = <span>🔗</span>, 
        href = '#' 
    }
) => {
    return (
        <a
            href={href}
            className="
        flex items-center gap-2
        p-2 rounded
        hover:bg-gray-700
        transition-colors
"
        >
            {icon}
            <span>{value}</span>
        </a>
    );
};

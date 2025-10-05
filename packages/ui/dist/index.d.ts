import * as react_jsx_runtime from 'react/jsx-runtime';
import { User, Item } from '@rei-init/micro-domain';
import { ReactNode } from 'react';

declare function Card({ title, content, pinned, user, onClick }: {
    content: string;
    pinned?: boolean;
    title?: string;
    user?: User;
    onClick?: () => void;
}): react_jsx_runtime.JSX.Element;

interface ContentProps {
    children: ReactNode;
}
declare const Content: ({ children }: ContentProps) => react_jsx_runtime.JSX.Element;

declare function Items({ items, user }: {
    items: Item[];
    user?: User;
}): react_jsx_runtime.JSX.Element;

declare function MobileTopBar(props: {
    title: string;
    children?: ReactNode;
}): react_jsx_runtime.JSX.Element;

declare function ProfileTitle({ children }: {
    children: ReactNode;
}): react_jsx_runtime.JSX.Element;

interface SideBarProps {
    children: ReactNode;
}
declare const SideBar: ({ children }: SideBarProps) => react_jsx_runtime.JSX.Element;

interface SideBarItemProps {
    value: string;
    icon?: ReactNode;
    href?: string;
}
declare const SideBarItem: (props: SideBarItemProps) => react_jsx_runtime.JSX.Element;

declare const DarkModeToggle: () => react_jsx_runtime.JSX.Element;

export { Card, Content, DarkModeToggle, Items, MobileTopBar, ProfileTitle, SideBar, SideBarItem };

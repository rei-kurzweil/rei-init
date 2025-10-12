import { type ReactNode } from "react";

interface ContentProps {
    children: ReactNode;
}

export const Content = ({ children }: ContentProps) => (
    <div className="flex flex-col justify-start 
                    w-full max-w-[800px] mx-auto
                    px-4 py-4
                    min-h-screen
                    Content">
        {children}
    </div>
);
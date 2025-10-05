import { type ReactNode } from "react";

interface ContentProps {
    children: ReactNode;
}

export const Content = ({ children }: ContentProps) => (
    <div className="flex flex-col items-start justify-start 
                    mx-auto w-full max-w-[1024px] 
                    px-4 pt-4
                    md:ml-64
                    Content">
        {children}
    </div>
);
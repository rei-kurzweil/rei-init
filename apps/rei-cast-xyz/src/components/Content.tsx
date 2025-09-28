import React from "react";

interface ContentProps {
    children: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }) => (
    <div className="flex flex-col items-start justify-start mx-auto w-full max-w-[1024px] px-4 pt-4">
        {children}
    </div>
);

export default Content;
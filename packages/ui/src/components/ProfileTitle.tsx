import { type ReactNode } from "react";

export function ProfileTitle({ children }: { children: ReactNode }) {
    return (
        <h1 className="my-4 px-2 text-[1.5rem]">
            {children}
        </h1>
    );
}
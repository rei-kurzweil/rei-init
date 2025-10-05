import { type ReactNode } from "react";

export function ProfileTitle({ children }: { children: ReactNode }) {
    return (
        <h1 className="text-2xl font-bold mb-4">
            {children}
        </h1>
    );
}
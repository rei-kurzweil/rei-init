import React, { ReactNode, HTMLAttributes } from "react"

import styles from './panel.module.css'


type RiiUIPanelProps = {
    children: ReactNode
} & HTMLAttributes<HTMLElement>

export function RiiUIPanel({ children, className = "", ...rest }: RiiUIPanelProps) {
    return (
        <section className={`${styles.panel} ${className}`} {...rest}>
            {children}
        </section>
    )
}
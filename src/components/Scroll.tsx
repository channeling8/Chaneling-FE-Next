import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

interface ScrollProps<T extends ElementType = 'div'> {
    as?: T;
    children: ReactNode;
    className?: string;
}

export default function Scroll<T extends ElementType = 'div'>({
    as,
    children,
    className = '',
    ...props
}: ScrollProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ScrollProps<T>>) {
    const Component = as ?? 'div'

    return (
        <Component
            className={`overflow-y-auto custom-scrollbar ${className}`} 
            {...props}
        >
            {children}
        </Component>
    );
}

import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

interface PageContentProps<T extends ElementType = 'div'> {
    as?: T
    children: ReactNode
    className?: string
}

export default function PageContent<T extends ElementType = 'div'>({
    as,
    children,
    className = '',
    ...props
}: PageContentProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof PageContentProps<T>>) {
    const Component = as ?? 'div'

    return (
        <Component
            className={`w-full px-4 tablet:px-5 desktop:px-16 ${className}`}
            {...props}
        >
            {children}
        </Component>
    )
}

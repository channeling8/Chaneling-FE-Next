interface LineProps {
    variant: 'thin' | 'medium' | 'thick'
}

export default function Line({ variant }: LineProps) {
    const heightClass = variant === 'thin' ? 'h-[1px]' : variant === 'medium' ? 'h-2' : 'h-4'

    const bgClass = variant === 'thick' ? 'bg-bg-divider' : 'bg-border-subtitle'

    return <div className={`${heightClass} ${bgClass} self-stretch -mx-4 tablet:-mx-5 desktop:-mx-16`} />
}

interface ChipProps {
    title: string
    onClick: () => void
    isActive: boolean
    variant?: 'default' | 'period'
}

export default function Chip({ title, onClick, isActive, variant = 'default' }: ChipProps) {
    const variantClassName =
        variant === 'period'
            ? `h-10 border px-4 font-body-16r desktop:h-[43px] ${
                  isActive
                      ? 'border-border-strong bg-primary-60/8 text-text-brand'
                      : 'border-transparent bg-bg-1 text-text-secondary'
              }`
            : `px-4 py-2 font-body-14m ${
                  isActive ? 'bg-gray-95 text-text-inverse' : 'cursor-pointer bg-bg-1 text-text-secondary'
              }`

    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex items-center justify-center whitespace-nowrap rounded-full ${variantClassName}`}
        >
            {title}
        </button>
    )
}

interface ActionRowProps {
    label: string
    buttonLabel: string
    danger?: boolean
    disabled?: boolean
    onClick?: () => void
}

export default function ActionRow({
    label,
    buttonLabel,
    danger = false,
    disabled = false,
    onClick,
}: ActionRowProps) {
    return (
        <div className="flex w-full items-center justify-between gap-4">
            <p className="min-w-0 truncate font-body-14m text-text-primary">
                {label}
            </p>
            <button
                type="button"
                disabled={disabled}
                onClick={onClick}
                className={`shrink-0 rounded-[20px] border px-3 py-1.5 font-body-14m transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${danger
                    ? 'border-border-error text-border-error hover:bg-border-error/10'
                    : 'border-border-default text-text-primary hover:bg-bg-1'
                    }`}
            >
                {buttonLabel}
            </button>
        </div>
    )
}

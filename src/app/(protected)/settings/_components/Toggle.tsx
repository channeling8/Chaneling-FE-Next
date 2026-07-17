interface ToggleProps {
    checked?: boolean
    label: string
    onChange?: (checked: boolean) => void
}

export default function Toggle({ checked = false, label, onChange }: ToggleProps) {
    const thumbPositionClass = checked ? 'left-[21.6px]' : 'left-[2.4px]'

    return (
        <button
            type="button"
            aria-pressed={checked}
            aria-label={label}
            onClick={() => onChange?.(!checked)}
            className={`relative h-6 w-[43.2px] shrink-0 rounded-3xl transition-colors ${checked ? 'bg-primary-60' : 'bg-bg-2'}`}
        >
            <span
                className={`absolute top-[2.4px] size-[19.2px] rounded-full bg-gray-95 transition-[left] ${thumbPositionClass}`}
            />
        </button>
    )
}

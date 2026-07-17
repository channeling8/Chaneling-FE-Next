interface ChipProps {
    title: string
    onClick: () => void
    isActive: boolean
}

export default function Chip({ title, onClick, isActive }: ChipProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`px-4 py-2 rounded-full font-body-14m ${isActive ? `bg-gray-95 text-text-inverse` : `bg-bg-1 text-text-secondary cursor-pointer`}`}
        >
            {title}
        </button>
    )
}

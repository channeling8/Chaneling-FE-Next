interface TooltipProps {
    first: string
    second: string
    third: string
    className?: string
}

export default function Tooltip({ first, second, third, className }: TooltipProps) {
    return (
        <div
            className={`absolute z-20 whitespace-nowrap flex flex-col py-3 px-4 items-start justify-center rounded-[20px] bg-bg-2 ${className}`}
        >
            <p className="font-body-14r text-text-primary">{first}</p>
            <p className="font-body-14r text-text-primary">{second}</p>
            <p className="font-body-14r text-text-primary">{third}</p>
        </div>
    )
}

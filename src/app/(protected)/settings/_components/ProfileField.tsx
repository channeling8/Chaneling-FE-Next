interface ProfileFieldProps {
    label: string
    value: string
}

export default function ProfileField({ label, value }: ProfileFieldProps) {
    return (
        <div className="flex w-full flex-col gap-0.5">
            <span className="font-caption-12m text-text-secondary">
                {label}
            </span>
            <span className="truncate font-body-16sb text-text-primary">
                {value}
            </span>
        </div>
    )
}

'use client'

import Toggle from './Toggle'

interface NotificationRowProps {
    checked: boolean
    description: string
    disabled?: boolean
    onChange?: (checked: boolean) => void
    title: string
}

export default function NotificationRow({
    title,
    description,
    checked,
    disabled,
    onChange,
}: NotificationRowProps) {
    const handleToggleChange = (nextChecked: boolean) => {
        onChange?.(nextChecked)
    }

    return (
        <div className="flex w-full flex-col gap-1">
            <div className="flex w-full items-center justify-between gap-4">
                <h2 className="min-w-0 truncate font-body-16sb text-text-primary">
                    {title}
                </h2>
                <Toggle
                    checked={checked}
                    disabled={disabled}
                    label={title}
                    onChange={handleToggleChange}
                />
            </div>
            <p className="truncate font-caption-12r text-text-secondary">{description}</p>
        </div>
    )
}

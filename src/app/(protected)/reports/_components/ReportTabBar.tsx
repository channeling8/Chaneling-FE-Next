'use client'

export type ReportTabType = 'overview' | 'analysis'

const TABS: Array<{ id: ReportTabType; label: string }> = [
    { id: 'overview', label: '개요' },
    { id: 'analysis', label: '분석' },
]

interface ReportTabBarProps {
    activeTab: ReportTabType
    disabled?: boolean
    onChange?: (tab: ReportTabType) => void
}

export default function ReportTabBar({ activeTab, disabled = false, onChange }: ReportTabBarProps) {
    const tabBaseClass =
        'flex flex-1 items-center justify-center rounded-2xl p-2 font-body-16sb transition-colors desktop:font-body-18sb'

    return (
        <div className="flex items-center rounded-[20px] bg-bg-1 p-1">
            {TABS.map((tab) => (
                <button
                    key={tab.id}
                    type="button"
                    disabled={disabled}
                    onClick={() => onChange?.(tab.id)}
                    className={`${tabBaseClass} ${disabled ? 'cursor-default' : 'cursor-pointer'} ${
                        activeTab === tab.id ? 'bg-bg-2 text-text-primary' : 'bg-transparent text-text-tertiary'
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    )
}

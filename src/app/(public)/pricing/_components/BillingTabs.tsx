import type { BillingCycle } from '../types'

interface BillingTabsProps {
    selected: BillingCycle
    onSelect: (cycle: BillingCycle) => void
}

export default function BillingTabs({ selected, onSelect }: BillingTabsProps) {
    return (
        <div className="flex w-full max-w-[328px] items-center rounded-[20px] bg-bg-1 p-1">
            <button
                type="button"
                aria-pressed={selected === 'monthly'}
                onClick={() => onSelect('monthly')}
                className={`flex h-10 min-w-0 flex-1 items-center justify-center rounded-2xl p-2 font-body-16sb transition-colors ${
                    selected === 'monthly' ? 'bg-bg-2 text-text-primary' : 'bg-bg-1 text-text-tertiary'
                }`}
            >
                월간
            </button>
            <button
                type="button"
                aria-pressed={selected === 'yearly'}
                onClick={() => onSelect('yearly')}
                className={`flex h-10 min-w-0 flex-1 items-center justify-center gap-2 rounded-2xl p-2 font-body-16sb transition-colors ${
                    selected === 'yearly' ? 'bg-bg-2 text-text-primary' : 'bg-bg-1 text-text-tertiary'
                }`}
            >
                <span>연간</span>
                <span className="rounded-lg bg-primary-60/8 px-2 py-1 font-caption-14m text-text-brand">
                    20% 할인
                </span>
            </button>
        </div>
    )
}

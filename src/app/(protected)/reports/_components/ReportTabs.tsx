'use client'

import { useState } from 'react'
import OverviewTab from './OverviewTab'

type TabType = 'overview' | 'analysis'

const TABS = [
    { id: 'overview', label: '개요' },
    { id: 'analysis', label: '분석' },
] as const

export default function ReportTabs() {
    const [activeTab, setActiveTab] = useState<TabType>('overview')

    const tabBaseClass =
        'flex flex-1 p-2 justify-center items-center rounded-2xl font-body-16sb desktop:font-body-18sb cursor-pointer transition-colors'

    return (
        <div className="flex flex-col gap-4">
            <div className="flex p-1 items-center rounded-[20px] bg-bg-1">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={
                            tabBaseClass +
                            ' ' +
                            (activeTab === tab.id ? 'bg-bg-2 text-text-primary' : 'bg-transparent text-text-tertiary')
                        }
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === 'overview' && <OverviewTab />}

            {activeTab === 'analysis' && (
                <section className="flex flex-col gap-4">
                    <div className="rounded-[20px] bg-bg-1 p-4 text-text-primary font-body-16r">분석 내용 영역</div>

                    {/* TODO: AI 구간 분석 섹션 */}
                    {/* TODO: 개선 제안 섹션 */}
                </section>
            )}
        </div>
    )
}

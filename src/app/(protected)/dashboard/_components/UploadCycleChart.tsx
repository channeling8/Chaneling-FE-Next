'use client'

import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { TooltipContentProps } from 'recharts'
import {
    getDashboardGraph,
    type DashboardPeriod,
    type DashboardScoreType,
} from '@/api/dashboard'
import { DashboardChartSkeleton } from '@/components/dashboard/DashboardSkeletons'

const metrics = ['채널 성장', '알고리즘', '시청 몰입', '반응 밀도', '유입 활력', '업로드 주기'] as const
const periods = ['1주', '1달'] as const

type Metric = (typeof metrics)[number]
type Period = (typeof periods)[number]

interface ChartPoint {
    date: string
    score: number | null
}

const metricScoreTypes: Record<Metric, DashboardScoreType> = {
    '채널 성장': 'CHANNEL_GROWTH',
    '알고리즘': 'ALGORITHM',
    '시청 몰입': 'VIEW_ENGAGEMENT',
    '반응 밀도': 'REACTION_DENSITY',
    '유입 활력': 'INFLOW_ACTIVITY',
    '업로드 주기': 'UPLOAD_CYCLE',
}

interface ChartTooltipProps extends TooltipContentProps {
    dataLength: number
}

function ChartTooltip({ active, activeIndex, dataLength, payload }: ChartTooltipProps) {
    if (!active || !payload || !payload.length) return null

    const point = payload[0].payload as ChartPoint
    if (point.score === null) return null

    const index = Number(activeIndex)
    const alignment = index === 0
        ? 'items-start text-left'
        : index === dataLength - 1
            ? '-translate-x-full items-end text-right'
            : '-translate-x-1/2 items-center text-center'

    return (
        <div className={`flex -translate-y-1 flex-col whitespace-nowrap ${alignment}`}>
            <span className="font-caption-12r text-text-secondary">
                {point.date}
            </span>
            <strong className="font-body-16m text-text-primary">
                {Math.round(point.score)}점
            </strong>
        </div>
    )
}

export default function UploadCycleChart() {
    const [activeMetric, setActiveMetric] = useState<Metric>('채널 성장')
    const [period, setPeriod] = useState<Period>('1주')
    const apiPeriod: DashboardPeriod = period === '1주' ? 'WEEK' : 'MONTH'
    const { data: graph, isPending } = useQuery({
        queryKey: ['dashboard', 'graph', apiPeriod],
        queryFn: () => getDashboardGraph(apiPeriod),
    })
    const data = useMemo(() => {
        const scoreHistory = graph?.scoreGraphs.find(
            (scoreGraph) => scoreGraph.scoreType === metricScoreTypes[activeMetric]
        )?.scoreHistory

        if (!scoreHistory?.length) return []

        return scoreHistory.map((point) => ({
            date: point.date.replaceAll('-', '.'),
            score: point.score,
        }))
    }, [activeMetric, graph])

    if (isPending) return <DashboardChartSkeleton />

    return (
        <section className="flex w-full flex-col gap-[22px] rounded-[20px] bg-bg-1 p-5">
            <div className="flex w-full items-start justify-between gap-2 overflow-hidden">
                <div className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <div className="flex w-max items-center">
                        {metrics.map((metric) => (
                            <button
                                key={metric}
                                type="button"
                                onClick={() => setActiveMetric(metric)}
                                className={`shrink-0 border-b-2 px-2 py-2 font-body-16sb transition-colors ${activeMetric === metric ? 'border-border-active text-text-primary' : 'border-transparent text-text-secondary hover:text-text-primary'}`}
                            >
                                {metric}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex shrink-0 gap-1 rounded-[20px] bg-bg-2 p-1">
                    {periods.map((item) => (
                        <button
                            key={item}
                            type="button"
                            onClick={() => setPeriod(item)}
                            className={`rounded-[20px] px-2 py-1 font-body-14m transition-colors ${period === item ? 'bg-bg-3 text-text-primary' : 'text-text-secondary hover:text-text-primary'}`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-[290px] w-full overflow-hidden">
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                    <AreaChart
                        key={`${activeMetric}-${period}`}
                        data={data}
                        margin={{ top: 62, right: 0, bottom: 0, left: 0 }}
                        accessibilityLayer
                    >
                        <defs>
                            <linearGradient id="dashboard-score-gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--color-primary-60)" stopOpacity={0.42} />
                                <stop offset="100%" stopColor="var(--color-primary-60)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="date" hide padding={{ left: 0, right: 0 }} />
                        <YAxis hide domain={[0, 100]} />
                        <Tooltip
                            defaultIndex={
                                data.length === 0
                                    ? undefined
                                    : period === '1주'
                                        ? 0
                                        : data.length - 1
                            }
                            position={{ y: 0 }}
                            offset={0}
                            allowEscapeViewBox={{ x: true, y: false }}
                            cursor={{ stroke: 'var(--color-gray-40)', strokeWidth: 1 }}
                            content={(props) => <ChartTooltip {...props} dataLength={data.length} />}
                            wrapperStyle={{ outline: 'none' }}
                            isAnimationActive={false}
                        />
                        <Area
                            type="monotone"
                            dataKey="score"
                            stroke="var(--color-primary-60)"
                            strokeWidth={1.5}
                            fill="url(#dashboard-score-gradient)"
                            activeDot={{ r: 3, fill: 'var(--color-primary-60)', stroke: 'var(--color-bg-1)', strokeWidth: 2 }}
                            animationDuration={350}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </section>
    )
}

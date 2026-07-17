'use client'

import { useMemo, useState } from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { TooltipContentProps } from 'recharts'

const metrics = ['채널 성장', '알고리즘', '시청 몰입', '반응 밀도', '유입 활력', '업로드 주기'] as const
const periods = ['1주', '1달'] as const

type Metric = (typeof metrics)[number]
type Period = (typeof periods)[number]

interface ChartPoint {
    date: string
    score: number
}

const chartData: Record<Period, ChartPoint[]> = {
    '1주': [
        { date: '2026.02.19', score: 39 },
        { date: '2026.02.20', score: 41 },
        { date: '2026.02.21', score: 45 },
        { date: '2026.02.22', score: 48 },
        { date: '2026.02.23', score: 50 },
        { date: '2026.02.24', score: 68 },
        { date: '2026.02.25', score: 74 },
    ],
    '1달': [
        { date: '2026.01.27', score: 31 },
        { date: '2026.01.30', score: 34 },
        { date: '2026.02.02', score: 36 },
        { date: '2026.02.05', score: 40 },
        { date: '2026.02.08', score: 43 },
        { date: '2026.02.11', score: 47 },
        { date: '2026.02.14', score: 50 },
        { date: '2026.02.17', score: 54 },
        { date: '2026.02.19', score: 58 },
        { date: '2026.02.21', score: 69 },
        { date: '2026.02.23', score: 78 },
        { date: '2026.02.25', score: 84 },
    ],
}

const metricOffsets: Record<Metric, number> = {
    '채널 성장': 0,
    '알고리즘': -5,
    '시청 몰입': 4,
    '반응 밀도': 1,
    '유입 활력': -2,
    '업로드 주기': 6,
}

function getMetricData(metric: Metric, period: Period) {
    const offset = metricOffsets[metric]

    return chartData[period].map((point, index) => ({
        ...point,
        score: Math.max(0, Math.min(100, point.score + offset + ((index % 3) - 1) * Math.abs(offset) * 0.2)),
    }))
}

interface ChartTooltipProps extends TooltipContentProps {
    dataLength: number
}

function ChartTooltip({ active, activeIndex, dataLength, payload }: ChartTooltipProps) {
    if (!active || !payload || !payload.length) return null

    const point = payload[0].payload as ChartPoint
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
    const data = useMemo(() => getMetricData(activeMetric, period), [activeMetric, period])

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
                            defaultIndex={period === '1주' ? 0 : 8}
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

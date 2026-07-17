import Scroll from '@/components/Scroll'
import PageContent from '@/components/layout/PageContent'
import DashboardHeader from './_components/DashboardHeader'
import InsightCard from './_components/InsightCard'
import MetricCardSmall from './_components/MetricCardSmall'
import MetricCardWithImage from './_components/MetricCardwithImage'
import UploadCycleChart from './_components/UploadCycleChart'
import { dashboardInsights } from './_data/insights'
import { Footer } from '@/components/Footer'

const metrics = [
    { label: '채널 성장', score: 99, status: '최상' as const },
    { label: '알고리즘', score: 99, status: '위험' as const },
    { label: '시청 몰입', score: 85, status: '우수' as const },
    { label: '반응 밀도', score: 99, status: '보통' as const },
    { label: '유입 활력', score: 85, status: '주의' as const },
    { label: '업로드 주기', score: 85, status: '최상' as const },
]

export default function DashboardPage() {
    return (
        <div className="flex h-full w-full flex-col bg-bg-0">
            <DashboardHeader />

            <Scroll as="main" className="flex-1">
                <PageContent className="mx-auto flex flex-col gap-8 pb-8 pt-4 desktop:pb-16 desktop:pt-8">
                    <section className="flex w-full flex-col gap-2">
                        <p className="font-body-14r text-text-tertiary">
                            26년 2월 19일 (05:15) 기준
                        </p>

                        <div className="grid w-full grid-cols-1 gap-2 tablet:grid-cols-[274px_minmax(0,1fr)] desktop:grid-cols-[298px_minmax(0,1fr)]">
                            <MetricCardWithImage
                                channelName="LeoJ Makeup"
                                subscribers="8.5M"
                                delta={42}
                                imageUrl="/images/dashboard/subscriber-card.png"
                            />
                            <div className="grid min-w-0 grid-cols-2 gap-2 tablet:grid-cols-3">
                                {metrics.map((metric) => (
                                    <MetricCardSmall key={metric.label} {...metric} delta={42} />
                                ))}
                            </div>
                        </div>
                    </section>

                    <UploadCycleChart />

                    <section className="flex w-full flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <h2 className="font-title-18sb text-text-primary">채널링의 제안</h2>
                            <p className="font-body-14r text-text-secondary">
                                최근 24시간 내 특정 영상 조회수가 평소 대비 280% 급증하며 추천 피드 유입이 80%를 점유했고, 노출 가속도가 평소 대비 3.5배 상승한 폭발적 성장 단계입니다.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            {dashboardInsights.map((insight) => (
                                <InsightCard
                                    key={insight.id}
                                    title={insight.title}
                                    description={insight.description}
                                    tags={insight.tags}
                                    href={`/dashboard/insights/${insight.id}`}
                                />
                            ))}
                        </div>
                    </section>

                </PageContent>
                <Footer />
            </Scroll>
        </div>
    )
}

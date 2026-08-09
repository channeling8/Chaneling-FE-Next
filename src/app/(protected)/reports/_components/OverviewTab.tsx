import EvaluationCard from './EvaluationCard'
import SummaryComment from './SummaryComment'
import SummaryCard from './SummaryCard'
import { ReportOverviewresponse, ReportSummaryResponse } from '@/types/reports'
import { formatReportMetric } from '@/utils/format'
import CommentSummarySection from './CommentSummarySection'
import OverviewTabSkeleton from './OverviewTabSkeleton'

interface OverviewProps {
    overview?: ReportOverviewresponse
    summary?: ReportSummaryResponse
    isPending: boolean
}
export default function OverviewTab({ overview, summary, isPending }: OverviewProps) {
    const overviewSummary = summary?.overviewSummary
    const analysisSummary = summary?.analysisSummary
    const seoSummary = summary?.seoSummary

    if (isPending) return <OverviewTabSkeleton />
    return (
        <div className="flex flex-col pt-8 gap-8">
            {overviewSummary && seoSummary && analysisSummary && (
                <section id="report-summary" className="flex flex-col gap-2">
                    <p className="font-body-16sb text-text-primary">리포트 요약</p>
                    <SummaryCard
                        status={overviewSummary.tag}
                        summaryTitle={overviewSummary.title}
                        details={overviewSummary.content}
                    />
                    <SummaryCard
                        status={analysisSummary.tag}
                        summaryTitle={analysisSummary.title}
                        details={analysisSummary.content}
                    />
                    <SummaryCard status={seoSummary.tag} summaryTitle={seoSummary.title} details={seoSummary.content} />
                </section>
            )}
            {overview && (
                <section id="video-evaluation" className="flex flex-col gap-2">
                    <p className="font-body-16sb text-text-primary">영상 평가</p>
                    <div className="grid grid-cols-2 tablet:grid-cols-3 gap-2">
                        <EvaluationCard
                            type="view"
                            score={formatReportMetric(overview.view)}
                            average={formatReportMetric(overview.viewChannelAvg)}
                        />
                        <EvaluationCard
                            type="likes"
                            score={formatReportMetric(overview.likeCount)}
                            average={formatReportMetric(overview.likeChannelAvg)}
                        />
                        <EvaluationCard
                            type="comments"
                            score={formatReportMetric(overview.comment)}
                            average={formatReportMetric(overview.commentChannelAvg)}
                        />
                        <EvaluationCard type="concept-consistency" score={formatReportMetric(overview.concept)} />
                        <EvaluationCard type="SEO" score={formatReportMetric(overview.seo)} />
                        <EvaluationCard type="revisit-rate" score={formatReportMetric(overview.revisit)} />
                    </div>
                </section>
            )}
            <section id="video-summary" className="flex flex-col gap-2">
                <p className="font-body-16sb text-text-primary">영상 요약</p>
                <div className="flex flex-col gap-4 p-5 rounded-[20px] bg-bg-1">
                    {overview?.summary.map((summary) => (
                        <SummaryComment
                            key={summary.time}
                            timestamp={summary.time}
                            comment={summary.title}
                            detail={summary.content}
                        />
                    ))}
                </div>
            </section>

            {overview && <CommentSummarySection overview={overview} />}
        </div>
    )
}

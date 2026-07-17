import type { DashboardInsight } from '../../../_data/insights'

interface InsightDetailContentProps {
    insight: DashboardInsight
}

export default function InsightDetailContent({ insight }: InsightDetailContentProps) {
    return (
        <article className="flex w-full flex-col gap-4">
            <header className="flex flex-col gap-2">
                <h2 className="font-title-18sb text-text-primary">{insight.title}</h2>
                <div className="flex flex-wrap gap-1">
                    {insight.tags.map((tag) => (
                        <span key={tag} className="rounded-lg bg-red-error-op8 px-2 py-1 font-caption-12m text-text-brand">
                            {tag}
                        </span>
                    ))}
                </div>
            </header>

            <div className="space-y-[21px] font-body-14r text-text-secondary desktop:space-y-6">
                <p>{insight.detailIntro}</p>
                <p>{insight.detail}</p>
            </div>

            <section className="font-body-14r text-text-secondary">
                <h3>채널 성장을 위한 참고 코멘트</h3>
                <ul className="list-disc pl-[21px] desktop:pl-6">
                    {insight.comments.map((comment) => (
                        <li key={comment}>{comment}</li>
                    ))}
                </ul>
            </section>
        </article>
    )
}

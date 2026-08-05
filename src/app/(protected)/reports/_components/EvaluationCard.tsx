interface EvaluationCardProps {
    type: 'view' | 'likes' | 'comments' | 'concept-consistency' | 'SEO' | 'revisit-rate'
    score: string
    average?: number
}

const CardTitle = {
    view: '조회수',
    likes: '좋아요',
    comments: '댓글',
    'concept-consistency': '콘텐츠 컨셉 일관성',
    SEO: 'SEO 구성',
    'revisit-rate': '재방문률',
}

const CardUnit = {
    view: '',
    likes: '',
    comments: '',
    'concept-consistency': '%',
    SEO: '%',
    'revisit-rate': '%',
}

export default function EvaluationCard({ type, score, average }: EvaluationCardProps) {
    return (
        <div className="p-4 rounded-[20px] bg-bg-1 flex flex-col gap-2 h-32.25 desktop:h-33.75">
            <p className="font-body-14m text-text-secondary">{CardTitle[type]}</p>
            <div className="flex">
                <p className="font-title-30r text-text-primary">{score}</p>
                <p className="font-title-30r text-text-secondary">{CardUnit[type]}</p>
            </div>
            {average && (
                <div className="flex gap-2">
                    <p className="font-caption-12r text-text-tertiary">평균</p>
                    <p className="font-caption-12m text-text-tertiary">
                        {average}
                        {CardUnit[type]}
                    </p>
                </div>
            )}
        </div>
    )
}

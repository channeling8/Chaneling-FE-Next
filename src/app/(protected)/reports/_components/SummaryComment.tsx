interface SummaryCommentProps {
    timestamp: string
    comment: string
    detail: string
}

export default function SummaryComment({ timestamp, comment, detail }: SummaryCommentProps) {
    return (
        <div className="flex gap-1.25">
            <p className="font-body-16r text-text-brand w-9.75 desktop:w-10.75">{timestamp}</p>
            <div className="flex flex-col gap-1.25">
                <p className="font-body-16m text-text-primary">{comment}</p>
                <p className="font-body-14r text-text-secondary">{detail}</p>
            </div>
        </div>
    )
}

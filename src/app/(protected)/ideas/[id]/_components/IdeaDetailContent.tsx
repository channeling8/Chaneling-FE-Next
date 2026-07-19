import type { IdeaDetail } from '@/api/ideas'
import { formatIdeaDate, formatIdeaTag } from '../../_components/idea-format'

interface IdeaDetailContentProps {
    idea: IdeaDetail
}

export default function IdeaDetailContent({ idea }: IdeaDetailContentProps) {
    return (
        <article className="flex w-full flex-col gap-4">
            <p className="font-caption-14r text-text-tertiary">{formatIdeaDate(idea.createdAt)} 생성</p>

            <header className="flex flex-col gap-2">
                <h2 className="font-title-18sb text-text-primary">{idea.title}</h2>
                <div className="flex flex-wrap gap-1">
                    {idea.tags.map((tag) => (
                        <span
                            key={tag}
                            className="whitespace-nowrap rounded-lg bg-text-brand/8 px-2 py-1 font-caption-12m text-text-brand"
                        >
                            {formatIdeaTag(tag)}
                        </span>
                    ))}
                </div>
            </header>

            <div className="whitespace-pre-wrap font-body-14r text-text-secondary">{idea.content}</div>
        </article>
    )
}

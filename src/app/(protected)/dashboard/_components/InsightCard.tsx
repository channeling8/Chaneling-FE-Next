import Link from 'next/link'
import ArrowIcon from '@/assets/icons/arrow.svg'

interface InsightCardProps {
    description: string
    href: string
    tags: string[]
    title: string
}

export default function InsightCard({ description, href, tags, title }: InsightCardProps) {
    return (
        <Link
            href={href}
            className="group block rounded-[20px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-active"
        >
            <article className="flex w-full flex-col gap-2 rounded-[20px] bg-bg-1 p-5 transition-colors group-hover:bg-bg-2 group-active:bg-bg-3">
                <div className="flex items-center justify-between gap-4">
                    <h3 className="min-w-0 truncate font-body-16sb text-text-primary">
                        {title}
                    </h3>
                    <ArrowIcon aria-hidden className="size-5 shrink-0 text-icon-secondary transition-transform group-hover:translate-x-0.5" />
                </div>
                <p className="font-body-14r text-text-secondary">{description}</p>
                <div className="h-px w-full bg-border-default" />
                <div className="flex flex-wrap gap-1">
                    {tags.map((tag) => (
                        <span key={tag} className="rounded-lg bg-red-error-op8 px-2 py-1 font-caption-12m text-text-brand">
                            {tag}
                        </span>
                    ))}
                </div>
            </article>
        </Link>
    )
}

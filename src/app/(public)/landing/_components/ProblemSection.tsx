import CardCommentIcon from '@/assets/icons/card_comment.svg'
import CardLightbulbIcon from '@/assets/icons/card_lightbulb.svg'
import CardSearchIcon from '@/assets/icons/card_search.svg'

const problems = [
    {
        title: '내 영상이 왜 잘됐는지 모르겠어요',
        description: '채널링은 어떤 요소가 성과를 만들었는지 데이터로 짚어드려요',
        Icon: CardSearchIcon,
    },
    {
        title: '다음에 뭘 만들어야 할지 모르겠어요',
        description: '채널링은 지금 뜨는 키워드 기반으로 채널에 맞는 아이디어를 제안해요',
        Icon: CardLightbulbIcon,
    },
    {
        title: '댓글을 다 읽을 시간이 없어요',
        description: '수백 개의 댓글 속 진짜 반응은 무엇인지, 채널링 AI가 감정과 키워드를 분류해 핵심만 전달해요',
        Icon: CardCommentIcon,
    },
]

export default function ProblemSection() {
    return (
        <section aria-labelledby="problem-heading" className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <h2 id="problem-heading" className="max-w-[190px] font-title-20sb text-text-primary desktop:max-w-none">
                    유튜버에게 필요한 건<br className="desktop:hidden" /> 더 많은 시간이 아닙니다
                </h2>
                <p className="font-body-14r text-text-secondary">
                    영상 하나 올리는 것도 벅찬데, 분석까지 직접?
                </p>
            </div>
            <div className="grid gap-2 desktop:grid-cols-3">
                {problems.map(({ title, description, Icon }) => (
                    <article
                        key={title}
                        className="flex min-h-[154px] flex-col gap-3 rounded-[20px] bg-bg-1 p-5 tablet:min-h-[133px] desktop:min-h-[163px]"
                    >
                        <Icon aria-hidden className="size-8 shrink-0" />
                        <div className="flex flex-col gap-1">
                            <h3 className="font-body-16sb text-text-primary">{title}</h3>
                            <p className="font-body-14r text-text-secondary">{description}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}

import { Fragment } from 'react'
import FaqArrowIcon from '@/assets/icons/faq_arrow.svg'

const faqs = [
    {
        question: '채널링, 유튜브 스튜디오랑 뭐가 다른가요?',
        answer: '유튜브 스튜디오가 조회수·시청 시간 같은 로우 데이터를 보여주는 데 그친다면, 채널링은 그 데이터를 가공해 “다음 영상에서 무엇을 해야 하는지”를 구체적으로 알려줍니다. 채널 컨셉과 현재 트렌드를 결합한 실천 가능한 피드백을 리포트로 받을 수 있다는 점이 채널링만의 차별점입니다.',
    },
    {
        question: '초보 유튜버도 쉽게 사용할 수 있을까요?',
        answer: '네, 가능합니다. 채널링은 복잡한 그래프 대신 직관적인 대시보드와 서술형 리포트를 제공합니다. 시청자 이탈 구간, 개선 포인트 등을 쉬운 언어로 풀어내어 누구나 바로 채널 운영에 적용할 수 있습니다.',
    },
    {
        question: '실제 채널 성장에 도움이 될까요?',
        answer: '채널링은 성공 채널들의 패턴을 데이터 기반으로 분석해 인사이트를 도출합니다. 감이 아닌 가공된 지표를 바탕으로 채널의 장단점을 파악하고, 제안된 가이드를 따라 개선해 나간다면 보다 체계적인 성장을 기대할 수 있습니다.',
    },
]

export default function FaqSection() {
    return (
        <section aria-labelledby="faq-heading" className="flex flex-col gap-4">
            <h2 id="faq-heading" className="font-title-20sb text-text-primary">
                자주 묻는 질문
            </h2>
            <div className="flex flex-col gap-3">
                {faqs.map(({ question, answer }, index) => (
                    <Fragment key={question}>
                        <details className="group py-2">
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-body-16sb text-text-primary [&::-webkit-details-marker]:hidden">
                                <span>{question}</span>
                                <FaqArrowIcon aria-hidden className="size-6 shrink-0 rotate-180 text-icon-secondary transition-transform group-open:rotate-0" />
                            </summary>
                            <p className="mt-2 font-body-14r text-text-secondary">{answer}</p>
                        </details>
                        {index < faqs.length - 1 && <div aria-hidden className="h-px bg-border-default" />}
                    </Fragment>
                ))}
            </div>
        </section>
    )
}

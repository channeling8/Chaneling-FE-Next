const STEPS = [
    { id: 1, label: '유튜브\n데이터 수집', widthClassName: 'w-14 tablet:w-24' },
    { id: 2, label: '영상 지표 및\n댓글 분석', widthClassName: 'w-[75px] tablet:w-[150px]' },
    { id: 3, label: '이탈 구간과\n알고리즘 최적화 분석', widthClassName: 'w-[131px] tablet:w-[262px]' },
    { id: 4, label: '리포트\n완성', widthClassName: 'w-6 tablet:w-12' },
]

interface ReportProgressBarProps {
    currentStep: number
}

export default function ReportProgressBar({ currentStep }: ReportProgressBarProps) {
    return (
        <div className="fixed left-1/2 top-16 z-50 w-[calc(100%-32px)] -translate-x-1/2 tablet:top-20 tablet:w-auto">
            <div
                className="mx-auto flex w-fit max-w-full gap-1 rounded-[20px] border border-border-default bg-bg-2 p-3 shadow-2xl"
                role="progressbar"
                aria-label="리포트 생성 진행률"
                aria-valuemin={1}
                aria-valuemax={4}
                aria-valuenow={currentStep}
            >
                {STEPS.map((step) => {
                    const isCompleted = currentStep > step.id
                    const isCurrent = currentStep === step.id
                    const isActive = currentStep >= step.id

                    return (
                        <div key={step.id} className="flex min-w-0 flex-col items-center text-center">
                            <p className="mb-0.5 h-9 whitespace-pre-line font-caption-12r text-text-secondary">
                                {step.label}
                            </p>
                            <div className="relative size-5">
                                <span
                                    className={`absolute left-1/2 top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-300 ${
                                        isActive ? 'bg-primary-60' : 'bg-bg-3'
                                    } ${isCurrent ? 'animate-pulse ring-4 ring-primary-60/20' : ''}`}
                                />
                            </div>
                            <div
                                className={`relative mt-1 h-0.5 overflow-hidden rounded-full bg-bg-3 tablet:h-1 ${step.widthClassName}`}
                            >
                                <span
                                    className="absolute inset-y-0 left-0 rounded-full bg-primary-60 transition-[width] ease-out"
                                    style={{
                                        width:
                                            isCompleted || (isCurrent && step.id === 4)
                                                ? '100%'
                                                : isCurrent
                                                  ? '85%'
                                                  : '0%',
                                        transitionDuration: isCurrent && step.id !== 4 ? '20000ms' : '500ms',
                                    }}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

import FaqSection from './_components/FaqSection'
import LandingAuthButton from './_components/LandingAuthButton'
import LandingHeader from './_components/LandingHeader'
import LandingHeroGradient from './_components/LandingHeroGradient'
import ProblemSection from './_components/ProblemSection'
import ReportPreviewSection from './_components/ReportPreviewSection'

export default function LandingPage() {
    return (
        <div className="min-h-screen overflow-x-hidden bg-bg-0 pb-38.5 desktop:pb-38">
            <section className="relative h-120.25 overflow-hidden bg-bg-0 text-center desktop:h-147">
                <LandingHeroGradient />
                <LandingHeader />
                <div className="absolute left-1/2 top-50 flex w-full -translate-x-1/2 flex-col items-center px-4 desktop:top-72">
                    <span className="flex h-7.25 items-center rounded-full border border-white/8 bg-white/8 px-2 font-body-14m text-text-primary desktop:h-8 desktop:font-body-16m">
                        언제나 내-일처럼, 유튜브 AI 파트너 채널링
                    </span>
                    <h1 className="mt-1 w-82 text-[24px] font-semibold leading-[1.4] tracking-[-0.02em] text-text-primary desktop:w-170 desktop:text-[48px] desktop:font-normal desktop:leading-[1.4]">
                        유튜브 영상 분석부터 트렌드 파악,
                        <br />
                        채널 전략까지
                    </h1>
                    <div className="mt-6">
                        <LandingAuthButton />
                    </div>
                </div>
            </section>

            <main className="mx-auto flex w-full max-w-360 flex-col gap-30 px-4 pt-8 tablet:px-5 desktop:px-16 desktop:pt-20.5">
                <ProblemSection />
                <ReportPreviewSection />
                <FaqSection />

                <section className="flex flex-col items-center text-center">
                    <p className="font-body-14r text-text-secondary desktop:font-body-16r">무료로 시작하세요!</p>
                    <h2 className="mt-1 text-[24px] font-semibold leading-[1.4] tracking-[-0.02em] text-text-primary desktop:text-[48px] desktop:font-normal">
                        채널링은 여러분의 채널을
                        <br />내 일처럼 바라볼 준비가 되어있어요
                    </h2>
                    <div className="mt-5 flex flex-col items-center gap-2">
                        <LandingAuthButton />
                        <p className="font-caption-12r text-text-secondary">
                            유튜브 연동을 위해 구글 로그인만 지원합니다.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    )
}

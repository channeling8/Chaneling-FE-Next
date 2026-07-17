export default function EnterpriseCard() {
    return (
        <article className="flex w-full items-center justify-between gap-4 rounded-[20px] bg-bg-1 p-6">
            <div className="flex min-w-0 flex-col gap-1">
                <h2 className="font-body-14m text-text-primary desktop:font-body-16m">Enterprise</h2>
                <p className="font-caption-12r text-text-secondary desktop:font-caption-14r">
                    규모에 맞는 엔터프라이즈급 지원
                </p>
            </div>
            <a
                href="https://open.kakao.com/o/sTPlNEvh"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 font-caption-12r text-text-brand underline underline-offset-2 desktop:font-caption-14r"
            >
                영업팀 문의하기
            </a>
        </article>
    )
}

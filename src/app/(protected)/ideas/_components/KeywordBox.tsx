import RankUpIcon from '@/assets/icons/rankUpIcon.svg'

export default function KeywordBox() {
    return (
        <div className="p-2 flex gap-4 items-center">
            <div className="text-text-brand font-title-18sb">1</div>
            <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                    <div className="font-body-16m text-text-primary">트렌드 키워드</div>
                    <div className="rounded-lg px-1 py-0.5 bg-text-brand/8 text-text-brand font-caption-12m desktop:text-[12px]">new</div>
                </div>
                <div className="flex items-center gap-1">
                    <div className="font-body-14r text-text-secondary">n시간 전 시작됨</div>
                    <div className="flex items-center gap-0.5">
                        <div className="text-text-brand font-body-14r">99</div>
                        <RankUpIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}

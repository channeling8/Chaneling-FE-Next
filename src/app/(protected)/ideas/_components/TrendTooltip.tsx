import Tooltip from '@/components/Tooltip'

export default function TrendTooltip() {
    return (
        <Tooltip
            first="키워드 검색량과 발생 시점을 분석한 지표입니다."
            second="최근에 시작된 이슈이면서 검색 강도가 높을수록"
            third="100점에 가까운 높은 점수가 부여됩니다."
            className="left-15 top-7 desktop:flex-row desktop:gap-1"
        />
    )
}

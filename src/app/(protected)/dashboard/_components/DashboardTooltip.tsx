import Tooltip from '@/components/Tooltip'

interface TooltipProps {
    label: string
}

export default function DashboardTooltip({ label }: TooltipProps) {
    const intro: Record<string, string> = {
        '채널 성장': '‘채널 성장’은 채널 규모의 전반적인 성장 속도 지표입니다.',
        알고리즘: '‘알고리즘’은 유튜브 영상 노출 정도입니다.',
        '시청 몰입': '‘시청 몰입’은 시청자가 영상을 끝까지 본 비율입니다.',
        '반응 밀도': '‘반응 밀도’은 좋아요, 댓글 등 시청자의 참여 비율입니다.',
        '유입 활력': '‘유입 활력’은 신규 시청자의 유입 강도입니다.',
        '업로드 주기': '‘업로드 주기’는 업로드의 규칙성 지표입니다.',
    }
    const style: Record<string, string> = {
        '채널 성장': 'top-9 -left-0',
        알고리즘: 'top-9 -left-0',
        '시청 몰입': 'top-9 -right-0',
        '반응 밀도': 'top-9 -left-0',
        '유입 활력': 'top-9 -left-0',
        '업로드 주기': 'top-9 -right-0',
    }

    return (
        <Tooltip
            first={intro[label]}
            second="데이터가 부족하면 -로 표시됩니다."
            third="데이터 반영까지 시간이 걸려 3일 전 수치가 표시됩니다."
            className={style[label]}
        />
    )
}

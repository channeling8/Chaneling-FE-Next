'use client'

// Recharts에서 도넛 차트를 만들기 위해 필요한 컴포넌트
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

// 도넛 차트 조각 하나의 데이터 타입
interface CommentChartData {
    name: string // 항목 이름: 긍정, 부정, 중립, 조언
    value: number // 해당 항목의 값 또는 비율
    color: string // 조각에 적용할 색상
}

// 부모 컴포넌트로부터 전달받는 props 타입
interface CommentDonutChartProps {
    totalComment: string // 도넛 중앙에 표시할 전체 댓글 수
    data: CommentChartData[] // 도넛 차트를 구성하는 데이터 배열
}

export default function CommentDonutChart({ totalComment, data }: CommentDonutChartProps) {
    return (
        // 차트 전체 크기와 중앙 텍스트 위치의 기준이 되는 부모
        // relative: 중앙 텍스트를 absolute로 배치하기 위한 기준
        // size-88: 가로·세로 크기를 모두 22rem으로 설정
        // shrink-0: flex 부모 안에서 차트 크기가 줄어들지 않게 설정
        <div className="relative mx-auto aspect-square w-full max-w-88">
            {/* 부모 크기에 맞춰 차트를 반응형으로 렌더링 */}
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        // 도넛 조각을 구성할 데이터
                        data={data}
                        // data 객체 중 숫자 값으로 사용할 속성
                        dataKey="value"
                        // 각 조각의 이름으로 사용할 속성
                        nameKey="name"
                        // 차트 중심의 가로 위치
                        cx="50%"
                        // 차트 중심의 세로 위치
                        cy="50%"
                        // 도넛 내부 반지름
                        // 값이 커질수록 가운데 구멍이 커지고 도넛이 얇아짐
                        innerRadius="51%"
                        // 도넛 외부 반지름
                        // 값이 커질수록 차트가 부모 영역에 더 꽉 참
                        outerRadius="94%"
                        // 조각 사이의 각도 간격
                        paddingAngle={2}
                        // 차트가 그려지는 각도
                        startAngle={90}
                        endAngle={450}
                        // 각 조각 끝부분의 둥근 정도
                        cornerRadius="15%"
                        // 조각 외곽선 제거
                        stroke="none"
                    >
                        {/* 데이터별로 도넛 조각의 색상 적용 */}
                        {data.map((item) => (
                            <Cell key={item.name} fill={item.color} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>

            {/* 도넛 중앙에 표시되는 댓글 수 */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-body-14m text-text-tertiary">총 댓글</span>

                <strong className="font-title-30r text-text-primary">{totalComment}</strong>
            </div>
        </div>
    )
}

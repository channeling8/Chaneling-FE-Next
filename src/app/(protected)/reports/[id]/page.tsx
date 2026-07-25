import ReportDetailContent from './_components/ReportDetailContent'

interface ReportDetailPageProps {
    params: Promise<{ id: string }>
    searchParams: Promise<{ videoId?: string | string[] }>
}

/**
 * 상세 분석 리포트 페이지 (/reports/[id])
 * - 이탈률 그래프
 * - AI 구간 분석
 * - 개선 제안
 */
export default async function ReportDetailPage({ params, searchParams }: ReportDetailPageProps) {
    const [{ id }, { videoId: videoIdParam }] = await Promise.all([params, searchParams])
    const reportId = Number(id)
    const videoId = Number(Array.isArray(videoIdParam) ? videoIdParam[0] : videoIdParam)

    return <ReportDetailContent reportId={reportId} videoId={videoId} />
}

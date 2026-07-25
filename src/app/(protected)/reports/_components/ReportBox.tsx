import ArrowIcon from '@/assets/icons/arrow.svg'
import X from '@/assets/icons/X.svg'
import { useDeleteReport } from '@/hooks/useDeleteReport'
import { useRouter } from 'next/navigation'

interface ReportBoxProps {
    generatedDate: string
    startDate: string
    endDate: string
    isDelete: boolean
    reportId: number
    videoId: number
}

export default function ReportBox({ generatedDate, startDate, endDate, isDelete, reportId, videoId }: ReportBoxProps) {
    const router = useRouter()
    const { mutate: deleteReport, isPending } = useDeleteReport({ videoId, page: 1, size: 8 })

    const handleDelete = () => {
        deleteReport(reportId)
    }

    return (
        <div className="flex flex-col p-4 rounded-[20px] bg-bg-1 gap-1">
            <div className="flex justify-between">
                <div className="flex gap-1">
                    <p className="font-body-14m text-text-secondary">생성</p>
                    <p className="font-body-14m text-text-secondary">{generatedDate}</p>
                </div>
                {isDelete ? (
                    <button type="button" disabled={isPending} aria-label="리포트 삭제" onClick={handleDelete}>
                        <X />
                    </button>
                ) : (
                    <button
                        type="button"
                        aria-label="리포트 상세 보기"
                        onClick={() => router.push(`/reports/${reportId}?videoId=${videoId}`)}
                    >
                        <ArrowIcon className="text-text-secondary" />
                    </button>
                )}
            </div>
            <div className="flex justify-start items-center">
                <p className="font-body-16sb text-text-primary">{startDate}</p>
                <p className="font-body-16sb text-text-primary">~</p>
                <p className="font-body-16sb text-text-primary">{endDate}</p>
            </div>
        </div>
    )
}

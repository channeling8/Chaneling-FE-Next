import ArrowIcon from '@/assets/icons/arrow.svg'
import X from '@/assets/icons/X.svg'

interface ReportBoxProps {
    generatedDate: string
    startDate: string
    endDate: string
    isDelete: boolean
}

export default function ReportBox({ generatedDate, startDate, endDate, isDelete }: ReportBoxProps) {
    return (
        <div className="flex flex-col p-4 rounded-[20px] bg-bg-1 gap-1">
            <div className="flex justify-between">
                <div className="flex gap-1">
                    <p className="font-body-14m text-text-secondary">생성</p>
                    <p className="font-body-14m text-text-secondary">{generatedDate}</p>
                </div>
                {isDelete ? <X /> : <ArrowIcon className="text-text-secondary" />}
            </div>
            <div className="flex justify-start items-center">
                <p className="font-body-16sb text-text-primary">{startDate}</p>
                <p className="font-body-16sb text-text-primary">~</p>
                <p className="font-body-16sb text-text-primary">{endDate}</p>
            </div>
        </div>
    )
}

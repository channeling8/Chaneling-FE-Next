import Thumbsup from '@/assets/icons/thumbsup.svg'

interface CommentProps {
    comment: string
    profileImageUrl: string
    nickname: string
    time: string
    like: number
}

export default function Comment({ comment, profileImageUrl, nickname, time, like }: CommentProps) {
    return (
        <div className="flex flex-col gap-3 py-2">
            <p className="font-body-14r text-text-primary">{comment}</p>
            <div className="flex justify-between items-center">
                <div className="flex gap-1">
                    <img className="rounded-full w-6 h-6" src={profileImageUrl} alt={`${nickname} 프로필`} />
                    <p className="font-caption-12r text-text-secondary">{nickname}</p>
                    <div className="flex">
                        <p className="font-caption-12r text-text-secondary">{time}</p>
                        <p className="font-caption-12r text-text-secondary">시간 전</p>
                    </div>
                </div>
                <div className="flex gap-1">
                    <Thumbsup />
                    <p className="font-caption-12r text-text-primary">{like}</p>
                </div>
            </div>
        </div>
    )
}

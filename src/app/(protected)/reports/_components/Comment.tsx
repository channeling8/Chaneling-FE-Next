import Thumbsup from '@/assets/icons/thumbsup.svg'
import Image from 'next/image'

interface CommentProps {
    comment: string
    profileImageUrl?: string
    nickname: string
    time: string
    like: number
}

export default function Comment({ comment, profileImageUrl, nickname, time, like }: CommentProps) {
    const imgUrl = profileImageUrl ?? ''
    return (
        <div className="flex flex-col gap-3 py-2">
            <p className="font-body-14r text-text-primary">{comment}</p>
            <div className="flex justify-between items-center">
                <div className="flex gap-1">
                    <div className="relative overflow-hidden rounded-full w-6 h-6">
                        <Image className="object-cover" fill src={imgUrl} alt={`${nickname} 프로필`} />
                    </div>
                    <p className="font-caption-12r text-text-secondary">{nickname}</p>
                    <p className="font-caption-12r text-text-secondary">{time}</p>
                </div>
                <div className="flex gap-1">
                    <Thumbsup />
                    <p className="font-caption-12r text-text-primary">{like}</p>
                </div>
            </div>
        </div>
    )
}

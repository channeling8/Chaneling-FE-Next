'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import VideoCard from './VideoCard'
import VideoSearchInputBar from './VideoSearchInputBar'
import { Modal } from '@/components/Modal'
import { useGetChannelVideoList } from '@/hooks/useGetChannelVideoList'
import { formatRelativeTime } from '@/utils/format'

export default function MyVideoList() {
    const router = useRouter()

    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }
    const { data, isLoading, error } = useGetChannelVideoList({
        type: 'LONG',
        page: 1,
        size: 4,
    })

    return (
        <div className="flex flex-col">
            <div className="font-title-18sb text-text-primary pb-2">내 영상 분석</div>
            <VideoSearchInputBar onClick={openModal} />

            <div className="flex items-center pt-1.5 pb-1.25">
                <div className="bg-bg-1 w-full h-px"></div>
                <div className="font-body-14m text-icon-secondary text-center whitespace-nowrap">최근 영상 선택</div>
                <div className="bg-bg-1 w-full h-px"></div>
            </div>
            <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-2 pb-3.5 relative">
                {isLoading && (
                    <div className="col-span-full py-6 text-center font-body-14m text-text-secondary">
                        영상을 불러오는 중...
                    </div>
                )}

                {/* {error && (
                    <div className="col-span-full py-6 text-center font-body-14m text-red-error">
                        영상 목록을 불러오지 못했습니다.
                    </div>
                )} */}

                {!isLoading && !error && data?.videoList.length === 0 && (
                    <div className="col-span-full py-6 text-center font-body-14m text-text-secondary">
                        최근 영상이 없습니다.
                    </div>
                )}

                {!isLoading &&
                    !error &&
                    data?.videoList?.map((video) => (
                        <VideoCard
                            key={video.videoId}
                            title={video.videoTitle}
                            leftside="조회수"
                            leftsideamount={`${video.viewCount.toLocaleString()}회`}
                            rightside={formatRelativeTime(video.uploadDate)}
                            imageUrl={video.videoThumbnailUrl}
                            onClick={() => router.push('/reports/period')}
                        />
                    ))}
            </div>
            <button
                className="px-4 py-2 w-full bg-bg-1 hover:bg-bg-3 cursor-pointer rounded-[20px]"
                onClick={() => router.push('/reports/my')}
            >
                더보기
            </button>

            {/* 생성 불가 모달  */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <Modal.Header
                    title="리포트를 생성할 수 없어요"
                    caption="입력한 링크를 분석하는 중 오류가 발생했어요 다시 시도하거나 다른 링크를 입력해주세요"
                    showClose
                    onClose={closeModal}
                />
                <Modal.Footer>
                    <Modal.Button onClick={closeModal} variant="error">
                        확인
                    </Modal.Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

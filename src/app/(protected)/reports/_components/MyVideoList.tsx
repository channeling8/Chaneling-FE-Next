import { useState } from 'react'
import VideoCard from './VideoCard'
import VideoSearchInputBar from './VideoSearchInputBar'
import MyVideoSelect from './MyVideoSelect'
import { Modal } from '@/components/Modal'

export default function MyVideoList() {
    const [selectedVideo, setSelectedVideo] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleClose = () => {
        setSelectedVideo(false)
    }

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }
    if (selectedVideo) {
        return <MyVideoSelect onBack={handleClose} />
    }
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
                <VideoCard
                    title="영상제목이 들어가는 곳입니다. 2줄까지 가능합니다. 나머지는 ...처리해주세요"
                    leftside="조회수"
                    rightside="17만회"
                    period="3년 전"
                />
                <VideoCard
                    title="영상제목이 들어가는 곳입니다. 2줄까지 가능합니다. 나머지는 ...처리해주세요"
                    leftside="조회수"
                    rightside="17만회"
                    period="3년 전"
                />
                <VideoCard
                    title="영상제목이 들어가는 곳입니다. 2줄까지 가능합니다. 나머지는 ...처리해주세요"
                    leftside="조회수"
                    rightside="17만회"
                    period="3년 전"
                />
                <VideoCard
                    title="영상제목이 들어가는 곳입니다. 2줄까지 가능합니다. 나머지는 ...처리해주세요"
                    leftside="조회수"
                    rightside="17만회"
                    period="3년 전"
                />
            </div>
            <button className="px-4 py-2 w-full bg-bg-1 rounded-[20px]" onClick={() => setSelectedVideo(true)}>
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

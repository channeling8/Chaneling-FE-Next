'use client'

import { useState, useRef } from 'react'
import Header from '@/components/layout/Header'
import PageContent from '@/components/layout/PageContent'
import Scroll from '@/components/Scroll'
import TextField from '@/components/TextField'
import { Modal } from '@/components/Modal'
import ImageIcon from '@/assets/icons/image.svg'
import XIcon from '@/assets/icons/X.svg'
import { createFeedback } from '@/api/feedback'

const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024)
    if (mb >= 1) {
        return `${mb.toFixed(1)} MB`
    }
    const kb = bytes / 1024
    return `${kb.toFixed(1)} KB`
}

export default function FeedbackPage() {
    // Form states
    const [inquiry, setInquiry] = useState('')
    const [contact, setContact] = useState('')
    const [files, setFiles] = useState<File[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [uploadProgress, setUploadProgress] = useState<number | null>(null)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [errorTitle, setErrorTitle] = useState('')
    const [uploadError, setUploadError] = useState('')
    const [showErrorModal, setShowErrorModal] = useState(false)

    const fileInputRef = useRef<HTMLInputElement>(null)

    // Form validation
    const hasInquiry = inquiry.trim().length > 0

    const showError = (title: string, message: string) => {
        setErrorTitle(title)
        setUploadError(message)
        setShowErrorModal(true)
    }

    // File Handlers
    const addFiles = (newFiles: File[]) => {
        // Validation: total files <= 5
        if (files.length + newFiles.length > 5) {
            showError(
                '파일 업로드에 실패했습니다',
                '첨부 파일은 최대 5개까지 업로드 가능하며,\n총 50MB 용량까지 가능해요.'
            )
            return
        }

        // Validation: type JPG, JPEG, PNG
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
        const hasInvalidType = newFiles.some(file => !allowedTypes.includes(file.type))
        if (hasInvalidType) {
            showError('파일 업로드에 실패했습니다', 'JPG, JPEG, PNG 파일만 업로드 가능합니다.')
            return
        }

        // Validation: total size <= 50MB (50 * 1024 * 1024 bytes)
        const newTotalSize = files.reduce((sum, f) => sum + f.size, 0) + newFiles.reduce((sum, f) => sum + f.size, 0)
        if (newTotalSize > 50 * 1024 * 1024) {
            showError(
                '파일 업로드에 실패했습니다',
                '첨부 파일은 최대 5개까지 업로드 가능하며,\n총 50MB 용량까지 가능해요.'
            )
            return
        }

        setFiles(prev => [...prev, ...newFiles])
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        addFiles(Array.from(e.target.files))
        e.target.value = ''
    }

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index))
    }

    const triggerFileSelect = () => {
        fileInputRef.current?.click()
    }

    // Drag and Drop
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        if (e.dataTransfer.files) {
            addFiles(Array.from(e.dataTransfer.files))
        }
    }

    // Submission Handler
    const handleSubmit = async () => {
        if (!hasInquiry) return
        setIsSubmitting(true)
        setUploadProgress(files.length > 0 ? 0 : null)

        try {
            await createFeedback(
                {
                    content: inquiry.trim(),
                    contactInfo: contact.trim() || undefined,
                    images: files,
                },
                files.length > 0 ? setUploadProgress : undefined
            )
            setShowSuccessModal(true)
        } catch {
            showError(
                '피드백을 전송하지 못했습니다',
                '피드백 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
            )
        } finally {
            setIsSubmitting(false)
            setUploadProgress(null)
        }
    }

    const handleCloseModal = () => {
        setShowSuccessModal(false)
        setInquiry('')
        setContact('')
        setFiles([])
    }

    return (
        <div className="flex h-full w-full flex-col overflow-hidden bg-gray-0 text-gray-95 selection:bg-primary-60/30 desktop:pt-3">
            <Header title="피드백" showMenu={true} />

            <Scroll as="main" className="flex-1">
                <PageContent className="py-2">
                    <div className="w-full flex flex-col gap-4 pb-12">
                    {/* 타이틀 및 서브타이틀 */}
                    <div className="flex flex-col gap-2">
                        <h2 className="font-title-18sb desktop:text-[20px] text-gray-95">
                            피드백 남기기
                        </h2>
                        <p className="font-body-14r desktop:text-[16px] text-text-secondary whitespace-pre-line">
                            서비스 이용 중 불편한 점이나 바라는 점을 남겨주세요.<br/>
                            빠르게 반영하여 만족스러운 경험을 하실 수 있도록<br/>
                            최선을 다하겠습니다. 감사합니다.
                        </p>
                    </div>

                    {/* 인스타그램 고객지원 알림창 */}
                    <div className="w-full bg-primary-60/8 rounded-[20px] px-4 py-3 flex">
                        <div className="flex flex-col">
                            <p className="font-body-14r desktop:text-[16px] text-text-brand">
                                급한 고객 지원 문의 사항은 인스타그램으로 남겨주세요<br/>
                                instagram: @chaneling.official
                            </p>
                        </div>
                    </div>

                    {/* 입력 폼 영역 */}
                    <div className="flex flex-col gap-6 pt-2">
                        {/* 문의사항 입력 (필수) */}
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex justify-between items-center w-full">
                                <div className="flex items-center">
                                    <span className="font-caption-12m tablet:text-[14px] desktop:text-[16px] font-medium text-text-secondary">문의사항 (필수)</span>
                                    <span className="text-primary-50 font-caption-12m tablet:text-[14px] desktop:text-[16px] font-medium">*</span>
                                </div>
                                <div className="font-caption-12r tablet:text-[14px] desktop:text-[14px] font-normal text-text-tertiary">
                                    <span className="text-text-secondary font-medium">{inquiry.length}</span>
                                    <span>/</span>
                                    <span>2000</span>
                                </div>
                            </div>
                            <TextField
                                placeholder="문의사항, 제안사항 또는 문제점을 자세히 설명해주세요"
                                value={inquiry}
                                onChange={setInquiry}
                                heightVariant="large"
                                showCounter={false}
                                maxLength={2000}
                                className="!w-full"
                                textareaClassName="desktop:text-[16px]"
                            />
                        </div>

                        {/* 연락처 정보 입력 (선택) */}
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex justify-between items-center w-full">
                                <span className="font-caption-12m tablet:text-[14px] desktop:text-[16px] font-medium text-text-secondary">연락처 정보 (선택)</span>
                                <div className="font-caption-12r tablet:text-[14px] desktop:text-[14px] font-normal text-text-tertiary">
                                    <span className="text-text-secondary font-medium">{contact.length}</span>
                                    <span>/</span>
                                    <span>100</span>
                                </div>
                            </div>
                            <TextField
                                placeholder="카카오톡, 인스타그램 아이디, 이메일 등 답장드릴 수 있는 연락처를 입력해주세요"
                                value={contact}
                                onChange={setContact}
                                heightVariant="large"
                                showCounter={false}
                                maxLength={100}
                                className="!w-full"
                                textareaClassName="desktop:text-[16px]"
                            />
                        </div>

                        {/* 첨부 파일 입력 (선택) */}
                        <div className="flex flex-col gap-2 w-full">
                            <span className="font-caption-12m tablet:text-[14px] desktop:text-[16px] font-medium text-text-secondary">첨부 파일 (JPG, JPEG, PNG) (선택)</span>
                            
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleFileChange} 
                                multiple 
                                accept="image/png, image/jpeg, image/jpg" 
                                className="hidden" 
                            />
                            
                            <div
                                onClick={triggerFileSelect}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`w-full h-[171px] bg-gray-10 rounded-[20px] flex flex-col justify-center items-center gap-2 cursor-pointer transition-all duration-200 ${
                                    isDragging ? 'border-primary-60 bg-primary-60/5' : 'border-transparent hover:border-white/10'
                                }`}
                            >
                                <div className="w-10 h-10 bg-gray-20 rounded-full flex items-center justify-center">
                                    <ImageIcon className="w-6 h-6 text-gray-50" />
                                </div>
                                <div className="flex flex-col gap-[2px] items-center text-center">
                                    <p className="font-body-14m text-text-primary">클릭하여 업로드하세요</p>
                                    <p className="font-caption-12m text-text-secondary tracking-tight">
                                        JPG, JPEG, PNG 파일만<br/>
                                        최대 5개까지 업로드 가능해요 (최대 50MB)
                                    </p>
                                </div>
                            </div>

                            {/* 업로드 파일 리스트 */}
                            {files.length > 0 && (
                                <div className="flex flex-col gap-2 mt-0">
                                    {files.map((file, idx) => (
                                        <div key={idx} className="w-full bg-gray-10 rounded-[20px] p-4 flex items-start justify-between">
                                            <div className="flex flex-col gap-[2px] min-w-0">
                                                <span className="font-body-14m text-text-primary truncate block">
                                                    {file.name}
                                                </span>
                                                <span className="font-caption-12r text-text-secondary tracking-tight">
                                                    {formatFileSize(file.size)}
                                                </span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    removeFile(idx)
                                                }}
                                                className="text-text-secondary cursor-pointer shrink-0"
                                                aria-label="파일 삭제"
                                            >
                                                <XIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 피드백 보내기 버튼 */}
                    <div className="w-full flex justify-center mt-4">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting || !hasInquiry}
                            className={`flex w-full items-center justify-center rounded-[20px] py-3 font-body-16sb transition-all duration-200 desktop:text-[18px] ${
                                hasInquiry
                                    ? 'cursor-pointer bg-primary-60 text-gray-95 hover:bg-primary-70 disabled:cursor-not-allowed'
                                    : 'cursor-not-allowed bg-gray-30 text-text-tertiary'
                            }`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    {uploadProgress !== null && uploadProgress < 100
                                        ? `파일 업로드 중... ${uploadProgress}%`
                                        : '피드백 처리 중...'}
                                </span>
                            ) : (
                                '피드백 보내기'
                            )}
                        </button>
                    </div>
                    </div>
                </PageContent>
            </Scroll>

            <Modal isOpen={showSuccessModal} onClose={handleCloseModal}>
                <Modal.Header
                    title="소중한 의견 감사합니다!"
                    caption={'피드백이 정상적으로 접수되었어요.\n더 나은 기능으로 보답하겠습니다.'}
                />
                <Modal.Footer>
                    <Modal.Button onClick={handleCloseModal}>
                        확인
                    </Modal.Button>
                </Modal.Footer>
            </Modal>

            <Modal isOpen={showErrorModal} onClose={() => setShowErrorModal(false)}>
                <Modal.Header title={errorTitle} caption={uploadError} />
                <Modal.Footer>
                    <Modal.Button
                        variant="error"
                        onClick={() => setShowErrorModal(false)}
                    >
                        확인
                    </Modal.Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

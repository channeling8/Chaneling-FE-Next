import api from '@/lib/axios'
import type { ApiResponse } from '@/types'

export interface CreateFeedbackParams {
    content: string
    contactInfo?: string
    images: File[]
}

export interface CreateFeedbackResult {
    feedbackId: number
}

export async function createFeedback({
    content,
    contactInfo,
    images,
}: CreateFeedbackParams, onUploadProgress?: (progress: number) => void): Promise<CreateFeedbackResult> {
    const formData = new FormData()
    formData.append('content', content)

    if (contactInfo) {
        formData.append('contactInfo', contactInfo)
    }

    images.forEach((image) => {
        formData.append('images', image)
    })

    const { data } = await api.post<ApiResponse<CreateFeedbackResult>>(
        '/feedbacks',
        formData,
        {
            onUploadProgress: (event) => {
                if (!onUploadProgress || !event.total) return
                onUploadProgress(Math.min(100, Math.round((event.loaded / event.total) * 100)))
            },
        }
    )

    if (!data.isSuccess) {
        throw new Error(data.message || '피드백 등록에 실패했습니다.')
    }

    return data.result
}

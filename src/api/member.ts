import api from '@/lib/axios'
import type { ApiResponse, User } from '@/types'

type MemberResult = Omit<User, 'channelId'>

export async function getMember(channelId: number): Promise<User> {
    const { data } = await api.get<ApiResponse<MemberResult>>('/members')
    return { ...data.result, channelId }
}

export interface MemberAgreements {
    marketingEmailAgree: boolean
    dayContentEmailAgree: boolean
}

export async function updateMemberAgreements(
    agreements: MemberAgreements
): Promise<MemberAgreements> {
    const { data } = await api.patch<ApiResponse<MemberAgreements>>(
        '/member-agree',
        agreements
    )
    return data.result
}

export async function updateMemberProfileImage(image: File): Promise<string> {
    const formData = new FormData()
    formData.append('image', image)

    const { data } = await api.patch<ApiResponse<{ updatedProfileImage: string }>>(
        '/members/profile-images',
        formData
    )

    return data.result.updatedProfileImage
}

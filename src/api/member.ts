import api from '@/lib/axios'
import type { ApiResponse, User } from '@/types'

type MemberResult = Omit<User, 'channelId'>

export async function getMember(channelId: number): Promise<User> {
    const { data } = await api.get<ApiResponse<MemberResult>>('/members')
    return { ...data.result, channelId }
}

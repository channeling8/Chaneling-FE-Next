export interface ApiResponse<T> {
    isSuccess: boolean
    code: string
    message: string
    result: T
}

export interface User {
    memberId: number
    channelId: number
    nickname: string
    googleEmail: string
    profileImage: string | null
    instagramLink: string | null
    tiktokLink: string | null
    facebookLink: string | null
    twitterLink: string | null
    marketingEmailAgree: boolean
    dayContentEmailAgree: boolean
}

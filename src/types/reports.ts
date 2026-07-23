export type ReportsListRequest = {
    channelId: number
    type: 'ALL' | 'LONG' | 'SHORTS'
    page: number
    size: number
}

export type ReportListResponse = {
    channelId: number
    page: number
    size: number
    hasNextPage: boolean
    totalElements: number
    totalPages: number
    reportList: Report[]
}

type Report = {
    videoId: number
    videoTitle: string
    videoThumbnailUrl: string
    videoCategory: string
    reportCount: number
    uploadDate: string
}

export type CategoryLeadersVideoResponse = LeadersVideo[]

type LeadersVideo = {
    poolVideoId: number
    youtubeVideoId: string
    title: string
    thumbnail: string
    publishedAt: string
    channelTitle: string
    channelThumbnail: string
}

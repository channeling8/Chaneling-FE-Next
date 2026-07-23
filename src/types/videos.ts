export type VideoInfoResponse = {
    videoId: number
    youtubeVideoId: string
    videoTitle: string
    videoThumbnailUrl: string
    videoCategory: string
    videoType: 'ALL'|'LONG'|'SHORTS'
    viewCount: number
    videoCreatedDate: string
    ChannelName: string
    lastUpdatedDate: string
}

export type VideoReportListRequest = {
    videoId: number
    page: number
    size: number
}

export type VideoReportListResponse = {
    totalReportCount: number
    page: number
    size: number
    hasNext: boolean
    reportList: Report[]
}

type Report = {
    reportId: 0
    createdAt: string
    startDate: string
    endDate: string
}

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

export type ReportOverviewresponse = {
    reportId: number
    view: number
    viewChannelAvg: number
    likeCount: number
    likeChannelAvg: number
    comment: number
    commentChannelAvg: number
    concept: number
    seo: number
    revisit: number
    summary: VideoSummary[]
    totalCommentCount: number
    neutralComment: number
    adviceComment: number
    positiveComment: number
    negativeComment: number
    positiveCommentPercent: number
    negativeCommentPercent: number
    neutralCommentPercent: number
    adviceCommentPercent: number
    commentSummary: CommentSummary | null
    comments: Comments[]
}

type VideoSummary = {
    time: string
    title: string
    content: string
}

export type ReportSummaryResponse = {
    reportId: number
    overviewSummary: SummaryType
    seoSummary: SummaryType
    analysisSummary: SummaryType
}

type SummaryType = {
    tag:
        | '최상'
        | '조언'
        | '우수'
        | '긍정'
        | '최적화 원활'
        | '보통'
        | '중립'
        | '양호'
        | '주의'
        | '개선 필요'
        | '최적화 필요'
        | '위험'
        | '부정'
    title: string
    content: string
}

type CommentSummary = {
    advice: string
    neutral: string
    negative: string
    positive: string
}

export type Comments = {
    category: string // 카테고리 (positive/negative/neutral/advice)
    content: string
    author: string
    authorProfileImageUrl: string | null
    publishedAt: string
    likeCount: number
}

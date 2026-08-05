import api from '@/lib/axios'
import type { ApiResponse } from '@/types'
import { CategoryLeadersVideoResponse, ReportOverviewresponse, ReportSummaryResponse } from '@/types/reports'

export interface RetentionPoint {
    time: string
    retentionRate: number
}

export interface CriticalSection {
    startTime: string
    endTime: string
    duration: number
}

export interface RetentionAnalysisDetail {
    title: string
    description: string
}

export interface ViewerRetentionAnalysis {
    criticalSection: CriticalSection
    causes: RetentionAnalysisDetail[]
    improvements: RetentionAnalysisDetail[]
    expectedEffect: string
}

export type AlgorithmCategory = 'TITLE' | 'DESCRIPTION' | 'HASHTAG' | 'THUMBNAIL' | 'DURATION'

export type AlgorithmGrade = 'NEEDS_IMPROVEMENT' | 'NORMAL' | 'GOOD'

export type AlgorithmIssueType = 'PROBLEM' | 'IMPROVEMENT' | 'CURRENT_STATUS'

export interface AlgorithmIssue {
    type: AlgorithmIssueType
    content: string
    examples: string | null
}

export interface AlgorithmOptimizationCategory {
    category: AlgorithmCategory
    score: number
    grade: AlgorithmGrade
    issues: AlgorithmIssue[]
}

export interface AlgorithmOptimization {
    categoryList: AlgorithmOptimizationCategory[]
    additionalSuggestions: string[]
}

export interface ReportAnalysis {
    reportId: number
    retentionGraph: string
    viewerRetentionAnalysis: string
    algorithmOptimization: string
}

interface ReportAnalysisResponse {
    reportId: number
    retentionGraph: unknown
    viewerRetentionAnalysis: unknown
    algorithmOptimization: unknown
}

export interface CreateReportRequest {
    videoId: number
    startDate: string
    endDate: string
}

export interface CreateReportResult {
    reportId: number
    videoId: number
}

export type ReportGenerationStepStatus = 'PENDING' | 'COMPLETED' | 'FAILED'

export interface ReportGenerationStatus {
    reportId: number
    overviewStatus: ReportGenerationStepStatus
    analysisStatus: ReportGenerationStepStatus
    ideaStatus?: ReportGenerationStepStatus
}

export async function createReport(request: CreateReportRequest): Promise<CreateReportResult> {
    const { data } = await api.post<ApiResponse<CreateReportResult>>('/reports', request)
    return data.result
}

export async function getReportStatus(reportId: number): Promise<ReportGenerationStatus> {
    const { data } = await api.get<ApiResponse<ReportGenerationStatus>>(`/reports/${reportId}/status`)
    return data.result
}

export async function getReportAnalysis(reportId: number): Promise<ReportAnalysis> {
    const { data } = await api.get<ApiResponse<ReportAnalysisResponse>>(`/reports/${reportId}/analysis`)

    return {
        reportId: data.result.reportId,
        retentionGraph: normalizeAnalysisField(data.result.retentionGraph),
        viewerRetentionAnalysis: normalizeAnalysisField(data.result.viewerRetentionAnalysis),
        algorithmOptimization: normalizeAnalysisField(data.result.algorithmOptimization),
    }
}

function normalizeAnalysisField(value: unknown) {
    if (typeof value === 'string') return value

    try {
        return JSON.stringify(value) ?? ''
    } catch {
        return ''
    }
}

export async function getCategoryLeadersVideo(): Promise<CategoryLeadersVideoResponse> {
    const { data } = await api.get<ApiResponse<CategoryLeadersVideoResponse>>(`/recommend-reports/leaders`)
    return data.result
}

export async function getReportOVerview(reportId: number): Promise<ReportOverviewresponse> {
    const { data } = await api.get<ApiResponse<ReportOverviewresponse>>(`/reports/${reportId}/overviews`)
    return data.result
}

export async function getReportSummary(reportId: number): Promise<ReportSummaryResponse> {
    const { data } = await api.get<ApiResponse<ReportSummaryResponse>>(`/reports/${reportId}/summary`)
    return data.result
}

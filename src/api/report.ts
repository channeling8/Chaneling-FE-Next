import api from '@/lib/axios'
import type { ApiResponse } from '@/types'
import { CategoryLeadersVideoResponse } from '@/types/reports'

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
    retentionGraph: RetentionPoint[]
    viewerRetentionAnalysis: ViewerRetentionAnalysis
    algorithmOptimization: AlgorithmOptimization
}

export async function getReportAnalysis(reportId: number): Promise<ReportAnalysis> {
    const { data } = await api.get<ApiResponse<ReportAnalysis>>(`/reports/${reportId}/analysis`)
    return data.result
}

export async function getCategoryLeadersVideo(): Promise<CategoryLeadersVideoResponse> {
    const { data } = await api.get<ApiResponse<CategoryLeadersVideoResponse>>(`/recommend-reports/leaders`)
    return data.result
}

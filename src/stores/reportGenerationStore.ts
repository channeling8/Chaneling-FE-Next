import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ProcessingReport {
    reportId: number
    videoId: number
    title?: string
    isHidden: boolean
}

interface ReportGenerationState {
    reports: ProcessingReport[]
    addReport: (report: Omit<ProcessingReport, 'isHidden'>) => void
    hideReport: (reportId: number) => void
    removeReport: (reportId: number) => void
    clearReports: () => void
}

export const useReportGenerationStore = create<ReportGenerationState>()(
    persist(
        (set) => ({
            reports: [],
            addReport: (report) =>
                set((state) => {
                    const existingReport = state.reports.find((item) => item.reportId === report.reportId)

                    if (!existingReport) {
                        return {
                            reports: [...state.reports, { ...report, isHidden: false }],
                        }
                    }

                    return {
                        reports: state.reports.map((item) =>
                            item.reportId === report.reportId
                                ? {
                                      ...item,
                                      ...report,
                                      title: report.title ?? item.title,
                                  }
                                : item
                        ),
                    }
                }),
            hideReport: (reportId) =>
                set((state) => ({
                    reports: state.reports.map((report) =>
                        report.reportId === reportId ? { ...report, isHidden: true } : report
                    ),
                })),
            removeReport: (reportId) =>
                set((state) => ({
                    reports: state.reports.filter((report) => report.reportId !== reportId),
                })),
            clearReports: () => set({ reports: [] }),
        }),
        {
            name: 'processing-reports-storage',
        }
    )
)

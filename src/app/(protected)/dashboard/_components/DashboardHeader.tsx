'use client'

import Header from '@/components/layout/Header'

export default function DashboardHeader() {
    return (
        <div className="desktop:hidden">
            <Header title="대시보드" showMenu={true} />
        </div>
    )
}

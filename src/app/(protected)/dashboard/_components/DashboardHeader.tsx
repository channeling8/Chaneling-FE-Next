'use client'

import MenuIcon from '@/assets/icons/menu.svg'
import Header from '@/components/layout/Header'
import { useLayoutStore } from '@/stores/layoutStore'

export default function DashboardHeader() {
    const openSidebar = useLayoutStore((state) => state.openSidebar)

    return (
        <div className="desktop:hidden">
            <Header title="대시보드" showMenu={true} />
        </div>
    )
}

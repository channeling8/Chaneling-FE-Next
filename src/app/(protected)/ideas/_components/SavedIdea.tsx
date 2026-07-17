import { useEffect, useRef, useState } from 'react'
import SavedIdeaCard from './SavedIdeaCard'
import SearchBar from './SearchBar'
import IdeaDetailView from './IdeaDetailView'
import PageContent from '@/components/layout/PageContent'
import DropdownOrder from '@/components/dropdown-order'

export default function SavedIdea() {
    const [selectedIdea, setSelectedIdea] = useState<boolean>(false)
    const [order, setOrder] = useState('최신순')
    const handleClose = () => {
        setSelectedIdea(false)
    }

    if (selectedIdea) {
        return <IdeaDetailView onBack={handleClose} />
    }

    return (
        <PageContent className="flex flex-col justify-start gap-2">
            <h1 className="text-text-primary font-title-18sb">저장한 아이디어</h1>
            <div className="flex flex-col gap-4">
                <SearchBar />
                <div className="flex justify-between">
                    <div className="flex">
                        <div className="text-text-primary font-body-14m">n</div>
                        <div className="text-text-secondary font-body-14m">개의 아이디어</div>
                    </div>
                    <DropdownOrder onChange={setOrder} />
                </div>
                <SavedIdeaCard onClick={() => setSelectedIdea(true)} />
            </div>
        </PageContent>
    )
}

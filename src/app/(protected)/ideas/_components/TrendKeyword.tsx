import { useState } from 'react'
import Tab from './Tab'
import KeywordBox from './KeywordBox'
import Infoicon from '@/assets/icons/infoIcon.svg'

export default function TrendKeyword() {
    const [activeTab, setActiveTab] = useState<'live' | 'custom'>('live')

    return (
        <div className="flex flex-col w-full mt-1 tablet:mt-3 desktop:mt-1">
            <div className="flex flex-col py-1 items-start">
                <div className="flex gap-1">
                    <h1 className="text-text-primary font-title-18sb">트렌드 키워드</h1>
                    <Infoicon />
                </div>
                <div className="text-text-secondary font-body-14r">
                    키워드를 클릭해 AI 콘텐츠 아이디어를 생성해보세요
                </div>
            </div>
            <div className="flex w-full border-b border-border-subtitle">
                <Tab title="실시간" onClick={() => setActiveTab('live')} isActive={activeTab === 'live'} />
                <Tab title="채널 맞춤형" onClick={() => setActiveTab('custom')} isActive={activeTab === 'custom'} />
            </div>
            {activeTab === 'live' && (
                <div className="flex flex-col mt-3.5 w-full">
                    <KeywordBox />
                    <KeywordBox />
                    <KeywordBox />
                    <KeywordBox />
                </div>
            )}
            {activeTab === 'custom' && (
                <div className="flex flex-col mt-3.5">
                    <KeywordBox />
                    <KeywordBox />
                    <KeywordBox />
                    <KeywordBox />
                </div>
            )}
        </div>
    )
}

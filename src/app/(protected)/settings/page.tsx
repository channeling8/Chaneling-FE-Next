'use client'

import { useState } from 'react'
import Scroll from '@/components/Scroll'
import Header from '@/components/layout/Header'
import PageContent from '@/components/layout/PageContent'
import { useLayoutStore } from '@/stores/layoutStore'
import { useAuthStore } from '@/stores/authStore'
import { useLogout } from '@/hooks/useLogout'
import ActionRow from './_components/ActionRow'
import EditableTextField from './_components/EditableTextField'
import NotificationRow from './_components/NotificationRow'
import PlanManagementSection from './_components/PlanManagementSection'
import ProfileField from './_components/ProfileField'
import SettingsProfileImage from './_components/SettingsProfileImage'
import Line from '@/components/Line'

const channel = {
    name: 'LeoJ Makeup',
    email: 'LeoJMakeup@gmail.com',
    loginId: 'kjh21351324390',
}

export default function SettingsPage() {
    const user = useAuthStore((state) => state.user)
    const { isLoggingOut, logout } = useLogout()
    const [emailNotifications, setEmailNotifications] = useState({
        dailyRecommendation: false,
        marketing: true,
    })

    return (
        <div className="flex h-full w-full flex-col bg-bg-0 desktop:pt-3">
            <Scroll as="main" className="flex-1">
                <Header title="설정" showMenu={true} />
                <PageContent className="flex flex-col gap-8 pb-8">
                    <div className="flex flex-col gap-5.5 pt-4.25 desktop:pt-0">
                        <SettingsProfileImage channelName={channel.name} />

                        <div className="flex w-full flex-col gap-2">
                            <ProfileField label="채널명" value={channel.name} />
                            <ProfileField label="이메일" value={channel.email} />
                        </div>

                        <div className="flex w-full flex-col gap-2">
                            <EditableTextField
                                label="채널 타겟층"
                                maxLength={50}
                                placeholder="더욱 최적화된 분석 및 제안을 위해 채널 타겟층을 입력해주세요"
                                fullWidth
                                inputClassName="h-[88px] desktop:h-[100px]"
                            />
                            <EditableTextField
                                label="채널 컨셉"
                                maxLength={150}
                                placeholder="더욱 최적화된 분석 및 제안을 위해 채널 컨셉을 입력해주세요"
                                heightVariant="large"
                                fullWidth
                            />
                        </div>
                    </div>

                    <Line variant="thick" />

                    <PlanManagementSection />

                    <Line variant="thick" />

                    <div className="flex flex-col gap-2">
                        <p className="font-caption-12m text-text-secondary">이메일 알림</p>
                        <div className="flex w-full flex-col gap-4">
                            <NotificationRow
                                checked={emailNotifications.marketing}
                                title="마케팅 이메일 수신 동의"
                                description="이벤트 또는 혜택과 관련된 마케팅 이메일 수신을 받아요"
                                onChange={(checked) => {
                                    setEmailNotifications((current) => ({ ...current, marketing: checked }))
                                }}
                            />
                            <NotificationRow
                                checked={emailNotifications.dailyRecommendation}
                                title="일일 콘텐츠 추천 메일 수신"
                                description="프리미엄 요금제에서 제공되는 일일 콘텐츠를 추천 받아요"
                                onChange={(checked) => {
                                    setEmailNotifications((current) => ({ ...current, dailyRecommendation: checked }))
                                }}
                            />
                        </div>
                    </div>

                    <Line variant="thick" />

                    <div className="flex flex-col gap-4">
                        <ActionRow label={`${channel.loginId}로 로그인 되어 있습니다`} buttonLabel="로그아웃" />
                        <ActionRow label="계정 삭제하기" buttonLabel="계정 삭제" danger />
                    </div>
                </PageContent>
            </Scroll>
        </div>
    )
}

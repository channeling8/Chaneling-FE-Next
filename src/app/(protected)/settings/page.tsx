'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { getChannel, updateChannelConcept, updateChannelTarget, type ChannelDetail } from '@/api/channel'
import { updateMemberAgreements, updateMemberProfileImage, type MemberAgreements } from '@/api/member'
import { cancelSubscription, getSubscriptionPage, type SubscriptionPageData } from '@/api/subscription'
import Scroll from '@/components/Scroll'
import { Modal } from '@/components/Modal'
import Header from '@/components/layout/Header'
import PageContent from '@/components/layout/PageContent'
import { useAuthStore } from '@/stores/authStore'
import { useLogout } from '@/hooks/useLogout'
import { useWithdraw } from '@/hooks/useWithdraw'
import ActionRow from './_components/ActionRow'
import EditableTextField from './_components/EditableTextField'
import NotificationRow from './_components/NotificationRow'
import PlanManagementSection from './_components/PlanManagementSection'
import ProfileField from './_components/ProfileField'
import SettingsProfileImage from './_components/SettingsProfileImage'
import SettingsConfirmModal from './_components/SettingsConfirmModal'
import SettingsPageSkeleton from './_components/SettingsPageSkeleton'
import Line from '@/components/Line'

type ConfirmModalType = 'logout' | 'withdraw' | 'cancelPlan' | null

export default function SettingsPage() {
    const user = useAuthStore((state) => state.user)
    const setUser = useAuthStore((state) => state.setUser)
    const queryClient = useQueryClient()
    const { data: channel, isPending: isChannelPending } = useQuery({
        queryKey: ['channel', user?.channelId],
        queryFn: () => getChannel(user!.channelId),
        enabled: Boolean(user?.channelId),
    })
    const subscriptionQuery = useQuery({
        queryKey: ['subscription', 'me'],
        queryFn: getSubscriptionPage,
        enabled: Boolean(user),
    })
    const cancelSubscriptionMutation = useMutation({
        mutationFn: cancelSubscription,
        onSuccess: ({ accessUntil }) => {
            queryClient.setQueryData<SubscriptionPageData>(['subscription', 'me'], (current) =>
                current
                    ? {
                          ...current,
                          status: 'CANCEL_SCHEDULED',
                          nextBillingDate: accessUntil,
                          canCancel: false,
                      }
                    : current
            )
            setConfirmModal(null)
            void queryClient.invalidateQueries({ queryKey: ['subscription', 'me'] })
        },
        onError: () => {
            setConfirmModal(null)
            setErrorMessage('구독을 해지하지 못했습니다. 잠시 후 다시 시도해주세요.')
        },
    })
    const { isLoggingOut, logout } = useLogout()
    const { isWithdrawing, withdraw } = useWithdraw()
    const [emailNotifications, setEmailNotifications] = useState<MemberAgreements>({
        marketingEmailAgree: false,
        dayContentEmailAgree: false,
    })
    const [channelTarget, setChannelTarget] = useState('')
    const [channelConcept, setChannelConcept] = useState('')
    const [isUpdatingAgreements, setIsUpdatingAgreements] = useState(false)
    const [isUploadingProfile, setIsUploadingProfile] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [confirmModal, setConfirmModal] = useState<ConfirmModalType>(null)

    useEffect(() => {
        if (!user) return

        setEmailNotifications({
            marketingEmailAgree: user.marketingEmailAgree,
            dayContentEmailAgree: user.dayContentEmailAgree,
        })
    }, [user])

    useEffect(() => {
        if (!channel) return

        setChannelTarget(channel.target ?? '')
        setChannelConcept(channel.concept ?? '')
    }, [channel])

    const requireChannelId = () => {
        if (!user?.channelId) {
            throw new Error('채널 정보를 확인할 수 없습니다.')
        }
        return user.channelId
    }

    const handleSaveTarget = async (target: string) => {
        try {
            const channelId = requireChannelId()
            const updatedTarget = await updateChannelTarget(channelId, target.trim())
            setChannelTarget(updatedTarget)
            queryClient.setQueryData<ChannelDetail>(['channel', channelId], (current) =>
                current ? { ...current, target: updatedTarget } : current
            )
        } catch (error) {
            setErrorMessage('채널 타겟층을 저장하지 못했습니다. 잠시 후 다시 시도해주세요.')
            throw error
        }
    }

    const handleSaveConcept = async (concept: string) => {
        try {
            const channelId = requireChannelId()
            const updatedConcept = await updateChannelConcept(channelId, concept.trim())
            setChannelConcept(updatedConcept)
            queryClient.setQueryData<ChannelDetail>(['channel', channelId], (current) =>
                current ? { ...current, concept: updatedConcept } : current
            )
        } catch (error) {
            setErrorMessage('채널 컨셉을 저장하지 못했습니다. 잠시 후 다시 시도해주세요.')
            throw error
        }
    }

    const handleProfileImageChange = async (image: File) => {
        if (!user) return

        setIsUploadingProfile(true)
        try {
            const profileImage = await updateMemberProfileImage(image)
            setUser({ ...user, profileImage })
        } catch {
            setErrorMessage('프로필 이미지를 변경하지 못했습니다. 잠시 후 다시 시도해주세요.')
        } finally {
            setIsUploadingProfile(false)
        }
    }

    const handleAgreementChange = async (key: keyof MemberAgreements, checked: boolean) => {
        if (!user || isUpdatingAgreements) return

        const previous = emailNotifications
        const next = { ...previous, [key]: checked }
        setEmailNotifications(next)
        setIsUpdatingAgreements(true)

        try {
            const updated = await updateMemberAgreements(next)
            setEmailNotifications(updated)
            setUser({
                ...user,
                marketingEmailAgree: updated.marketingEmailAgree,
                dayContentEmailAgree: updated.dayContentEmailAgree,
            })
        } catch {
            setEmailNotifications(previous)
            setErrorMessage('이메일 수신 설정을 변경하지 못했습니다. 잠시 후 다시 시도해주세요.')
        } finally {
            setIsUpdatingAgreements(false)
        }
    }

    const handleWithdraw = async () => {
        try {
            await withdraw()
        } catch {
            setConfirmModal(null)
            setErrorMessage('계정을 삭제하지 못했습니다. 잠시 후 다시 시도해주세요.')
        }
    }

    return (
        <div className="flex h-full w-full flex-col bg-bg-0 desktop:pt-3">
            <Scroll as="main" className="flex-1">
                <Header title="설정" showMenu={true} />
                {!user || isChannelPending || subscriptionQuery.isPending ? (
                    <SettingsPageSkeleton />
                ) : (
                    <PageContent className="flex flex-col gap-8 pb-8">
                        <div className="flex flex-col gap-5.5 pt-4.25 desktop:pt-0">
                            <SettingsProfileImage
                                channelName={user?.nickname ?? '채널'}
                                disabled={isUploadingProfile}
                                onChange={(file) => void handleProfileImageChange(file)}
                                src={user?.profileImage}
                            />

                            <div className="flex w-full flex-col gap-2">
                                <ProfileField label="채널명" value={user?.nickname ?? ''} />
                                <ProfileField label="이메일" value={user?.googleEmail ?? ''} />
                            </div>

                            <div className="flex w-full flex-col gap-2">
                                <EditableTextField
                                    label="채널 타겟층"
                                    initialValue={channelTarget}
                                    maxLength={50}
                                    placeholder="더욱 최적화된 분석 및 제안을 위해 채널 타겟층을 입력해주세요"
                                    inputClassName="h-[88px] desktop:h-[100px]"
                                    onSave={handleSaveTarget}
                                />
                                <EditableTextField
                                    label="채널 컨셉"
                                    initialValue={channelConcept}
                                    maxLength={150}
                                    placeholder="더욱 최적화된 분석 및 제안을 위해 채널 컨셉을 입력해주세요"
                                    heightVariant="large"
                                    onSave={handleSaveConcept}
                                />
                            </div>
                        </div>

                        <Line variant="thick" />

                        <PlanManagementSection
                            subscription={subscriptionQuery.data}
                            onCancelPlan={() => setConfirmModal('cancelPlan')}
                            onRetry={() => void subscriptionQuery.refetch()}
                        />

                        <Line variant="thick" />

                        <div className="flex flex-col gap-2">
                            <p className="font-caption-12m text-text-secondary">이메일 알림</p>
                            <div className="flex w-full flex-col gap-4">
                                <NotificationRow
                                    checked={emailNotifications.marketingEmailAgree}
                                    disabled={isUpdatingAgreements}
                                    title="마케팅 이메일 수신 동의"
                                    description="이벤트 또는 혜택과 관련된 마케팅 이메일 수신을 받아요"
                                    onChange={(checked) => {
                                        void handleAgreementChange('marketingEmailAgree', checked)
                                    }}
                                />
                                <NotificationRow
                                    checked={emailNotifications.dayContentEmailAgree}
                                    disabled={isUpdatingAgreements}
                                    title="일일 콘텐츠 추천 메일 수신"
                                    description="프리미엄 요금제에서 제공되는 일일 콘텐츠를 추천 받아요"
                                    onChange={(checked) => {
                                        void handleAgreementChange('dayContentEmailAgree', checked)
                                    }}
                                />
                            </div>
                        </div>

                        <Line variant="thick" />

                        <div className="flex flex-col gap-4">
                            <ActionRow
                                label={`${user?.googleEmail ?? ''}로 로그인 되어 있습니다`}
                                buttonLabel={isLoggingOut ? '로그아웃 중' : '로그아웃'}
                                disabled={isLoggingOut || isWithdrawing}
                                onClick={() => setConfirmModal('logout')}
                            />
                            <ActionRow
                                label="계정 삭제하기"
                                buttonLabel={isWithdrawing ? '삭제 중' : '계정 삭제'}
                                danger
                                disabled={isLoggingOut || isWithdrawing}
                                onClick={() => setConfirmModal('withdraw')}
                            />
                        </div>
                    </PageContent>
                )}
            </Scroll>

            <Modal isOpen={Boolean(errorMessage)} onClose={() => setErrorMessage('')}>
                <Modal.Header title="설정을 변경하지 못했습니다" caption={errorMessage} />
                <Modal.Footer>
                    <Modal.Button variant="error" onClick={() => setErrorMessage('')}>
                        확인
                    </Modal.Button>
                </Modal.Footer>
            </Modal>

            <SettingsConfirmModal
                isOpen={confirmModal === 'logout'}
                title="로그아웃 하시겠어요?"
                caption="언제든지 다시 로그인할 수 있어요"
                confirmLabel="로그아웃"
                pendingLabel="로그아웃 중"
                isPending={isLoggingOut}
                onClose={() => setConfirmModal(null)}
                onConfirm={() => void logout()}
            />

            <SettingsConfirmModal
                isOpen={confirmModal === 'withdraw'}
                title="정말 채널링을 떠나시겠어요?"
                caption={'삭제된 데이터는 다시 복구할 수 없으니\n신중하게 결정해 주세요'}
                confirmLabel="탈퇴"
                pendingLabel="탈퇴 중"
                confirmVariant="error"
                isPending={isWithdrawing}
                onClose={() => setConfirmModal(null)}
                onConfirm={() => void handleWithdraw()}
            />

            <SettingsConfirmModal
                isOpen={confirmModal === 'cancelPlan'}
                title="정말 구독을 해지하시겠습니까?"
                caption={'해지 시, 다음 결제일 전까지\n혜택을 이용하실 수 있습니다.'}
                confirmLabel="해지"
                pendingLabel="해지 중"
                isPending={cancelSubscriptionMutation.isPending}
                onClose={() => setConfirmModal(null)}
                onConfirm={() => cancelSubscriptionMutation.mutate()}
            />
        </div>
    )
}

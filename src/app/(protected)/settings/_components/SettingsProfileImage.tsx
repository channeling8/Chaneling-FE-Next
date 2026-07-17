import ProfileImage from '@/components/ProfileImage'

interface SettingsProfileImageProps {
    channelName: string
}

export default function SettingsProfileImage({ channelName }: SettingsProfileImageProps) {
    const label = `${channelName} 프로필 이미지`

    return (
        <>
            <ProfileImage size={80} aria-label={label} className="tablet:hidden" />
            <ProfileImage size={120} aria-label={label} className="hidden tablet:block desktop:hidden" />
            <ProfileImage size={193} aria-label={label} className="hidden desktop:block" />
        </>
    )
}

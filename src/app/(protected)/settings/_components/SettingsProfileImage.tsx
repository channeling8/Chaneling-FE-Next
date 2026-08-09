'use client'

import { useRef } from 'react'
import ProfileImage from '@/components/ProfileImage'

interface SettingsProfileImageProps {
    channelName: string
    disabled?: boolean
    onChange: (file: File) => void
    src?: string | null
}

export default function SettingsProfileImage({
    channelName,
    disabled = false,
    onChange,
    src,
}: SettingsProfileImageProps) {
    const label = `${channelName} 프로필 이미지`
    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <div className="relative w-fit">
            <input
                ref={inputRef}
                type="file"
                accept="image/png,image/jpeg"
                className="hidden"
                onChange={(event) => {
                    const file = event.target.files?.[0]
                    if (file) onChange(file)
                    event.target.value = ''
                }}
            />
            <button
                type="button"
                disabled={disabled}
                aria-label={`${label} 변경`}
                onClick={() => inputRef.current?.click()}
                className="rounded-full transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
            >
                <ProfileImage src={src} size={80} aria-label={label} className="tablet:hidden" />
                <ProfileImage src={src} size={120} aria-label={label} className="hidden tablet:block desktop:hidden" />
                <ProfileImage src={src} size={193} aria-label={label} className="hidden desktop:block" />
            </button>
        </div>
    )
}

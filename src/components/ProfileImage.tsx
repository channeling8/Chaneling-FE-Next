import { HTMLAttributes } from 'react';

interface ProfileImageProps extends HTMLAttributes<HTMLDivElement> {
    /** 이미지 URL (null이나 undefined일 경우 기본 배경색 표시) */
    src?: string | null;
    size?: number;
}


export default function ProfileImage({
    src,
    size = 72,
    className = '',
    style,
    ...props
}: ProfileImageProps) {
    return (
        <div
            className={`rounded-full bg-gray-30 bg-center bg-cover bg-no-repeat shrink-0 ${className}`}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundImage: src ? `url(${src})` : undefined,
                ...style,
            }}
            {...props}
        />
    );
}

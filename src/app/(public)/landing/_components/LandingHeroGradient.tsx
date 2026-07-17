const gradient =
    'conic-gradient(from 90deg,rgb(218,27,46) 0%,rgb(169,25,40) 12.5%,rgb(119,24,34) 25%,rgb(70,22,27) 37.5%,rgb(45,21,24) 43.75%,rgb(20,20,21) 50%,rgb(20,20,21) 99.99%,rgb(45,21,24) 99.991%,rgb(70,22,27) 99.992%,rgb(119,24,34) 99.995%,rgb(169,25,40) 99.997%,rgb(218,27,46) 100%)'

function GradientHalf() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 720 1176"
            preserveAspectRatio="none"
            className="size-full"
        >
            <g transform="matrix(68.339 0 0 29.126 360 588)">
                <foreignObject x="-383.57" y="-383.57" width="767.15" height="767.15">
                    <div
                        style={{ width: '100%', height: '100%', backgroundImage: gradient }}
                    />
                </foreignObject>
            </g>
        </svg>
    )
}

export default function LandingHeroGradient() {
    return (
        <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[960px] rotate-180 desktop:h-[1176px]"
        >
            <div className="flex size-full overflow-hidden">
                <div className="h-full min-w-0 flex-1">
                    <GradientHalf />
                </div>
                <div className="h-full min-w-0 flex-1 -scale-y-100 rotate-180">
                    <GradientHalf />
                </div>
            </div>
        </div>
    )
}

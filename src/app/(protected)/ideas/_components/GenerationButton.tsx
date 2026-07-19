interface GenerationButtonProps {
    isPending: boolean
    onClick: () => void
}

export default function GenerationButton({ isPending, onClick }: GenerationButtonProps) {
    return (
        <button
            type="button"
            disabled={isPending}
            onClick={onClick}
            className="w-full px-1.5 py-3.5 rounded-[20px] items-center justify-center bg-primary-60 font-body-16sb text-text-primary border border-primary-60 hover:border-border-strong hover:bg-primary-60/8 hover:text-border-strong disabled:cursor-not-allowed disabled:border-transparent disabled:bg-bg-2 disabled:text-text-disabled"
        >
            {isPending ? '아이디어 생성 중...' : '콘텐츠 아이디어 생성'}
        </button>
    )
}

import Search from '@/assets/icons/search.svg'

interface SearchBarProps {
    value: string
    onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <div className="w-full bg-bg-1 py-3 px-4 rounded-[20px] flex flex-row justify-between ">
            <input
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="font-body-16r text-text-primary placeholder:text-text-secondary w-full items-center focus:outline-none"
                placeholder="아이디어를 검색하세요"
                aria-label="아이디어 검색"
            />
            <Search className="shrink-0 text-icon-secondary" />
        </div>
    )
}

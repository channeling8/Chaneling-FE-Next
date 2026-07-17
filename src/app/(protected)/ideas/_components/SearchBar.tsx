import Search from '@/assets/icons/search.svg'

export default function SearchBar() {
    return (
        <div className="w-full bg-bg-1 py-3 px-4 rounded-[20px] flex flex-row justify-between ">
            <input
                className="font-body-16r text-text-secondary w-full items-center focus:outline-none"
                placeholder="아이디어를 검색하세요"
            />
            <Search />
        </div>
    )
}

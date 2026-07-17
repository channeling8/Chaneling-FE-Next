interface DropdownVideoTypeProps {
    handleOptionValue: (e: React.MouseEvent<HTMLButtonElement>, option: string) => void
}

export const DropdownVideoType = ({ handleOptionValue }: DropdownVideoTypeProps) => {
    const dropdownOptions = ['선택없음', '숏폼 (3분 미만)', '롱폼 (3분 이상)']

    return (
        <div className="flex flex-col w-82 absolute -bottom-50 right-0">
            {dropdownOptions.map((option) => {
                const baseStyle =
                    'flex flex-col justify-center items-start p-4 gap-2 bg-bg-1 hover:bg-bg-2 font-body-16r cursor-pointer'
                const conditionalStyle = 'first:rounded-t-lg last:rounded-b-lg'

                return (
                    <button
                        key={option}
                        type="button"
                        className={`${baseStyle} ${conditionalStyle}`}
                        onClick={(e) => handleOptionValue(e, option)}
                    >
                        {option}
                    </button>
                )
            })}
        </div>
    )
}

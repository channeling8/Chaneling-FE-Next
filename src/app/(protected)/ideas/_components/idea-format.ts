export function formatIdeaDate(dateString: string) {
    const date = new Date(dateString)

    if (Number.isNaN(date.getTime())) {
        return dateString
    }

    const year = String(date.getFullYear()).slice(-2)
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${year}년 ${month}월 ${day}일 (${hours}:${minutes})`
}

export function formatIdeaTag(tag: string) {
    const normalizedTag = tag.trim().replace(/^[\s#\[\]"']+|[\s\[\]"']+$/g, '')
    return normalizedTag ? `#${normalizedTag}` : ''
}

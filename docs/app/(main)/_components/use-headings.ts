import { useEffect, useState } from 'react'

export default function useHeadings() {
    const [headings, setHeadings] = useState<Element[]>([])

    useEffect(() => {
        const newHeadings: Element[] = []

        document.querySelectorAll('h2, h3').forEach(heading => {
            newHeadings.push(heading)
        })

        setHeadings(newHeadings)
    }, [])

    return headings
}

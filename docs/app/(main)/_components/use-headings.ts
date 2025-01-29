import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function useHeadings() {
    const pathname = usePathname()
    const [headings, setHeadings] = useState<Element[]>([])

    useEffect(() => {
        const newHeadings: Element[] = []

        document.querySelectorAll('h2, h3').forEach(heading => {
            newHeadings.push(heading)
        })

        setHeadings(newHeadings)
    }, [pathname])

    return headings
}

import type { ReactNode } from 'react'
import Link from '@mui/material/Link'
import OpenInNew from '@mui/icons-material/OpenInNew'

export function LinkNewTab({
    href,
    children
}: {
    href: string
    children: ReactNode
}) {
    return (
        <Link href={href} target="_blank">
            {children}
            <OpenInNew
                sx={{
                    fontSize: '1em',
                    mb: 1,
                    ml: 0.5,
                    verticalAlign: 'middle'
                }}
            />
        </Link>
    )
}

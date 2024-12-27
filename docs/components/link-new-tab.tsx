import { OpenInNew } from '@mui/icons-material'
import { Link } from '@mui/material'

export function LinkNewTab({
    href,
    children
}: {
    href: string
    children: React.ReactNode
}) {
    return (
        <Link href={href} target="_blank">
            {children}
            <OpenInNew
                sx={{
                    fontSize: '1em'
                }}
            />
        </Link>
    )
}

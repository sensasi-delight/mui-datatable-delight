'use client'

import { usePathname } from 'next/navigation'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import GitHub from '@mui/icons-material/GitHub'
import OpenInNew from '@mui/icons-material/OpenInNew'

const BASE_URL =
    'https://github.com/sensasi-delight/mui-datatable-delight/edit/alpha'

const DOCS_PATH = BASE_URL + '/docs/app/(main)/docs/_mds'
const EXAMPLES_PATH = BASE_URL + '/docs/app/(main)'

export default function EditPageButton({ iconOnly }: { iconOnly?: boolean }) {
    const pathname = usePathname()

    const isExamplePages = pathname.startsWith('/examples')

    const mdxPath = isExamplePages
        ? pathname + '/page.mdx'
        : pathname.replace('/docs', '') +
          (pathname.split('/').length === 3 ? '/index.mdx' : '.mdx')

    if (iconOnly) {
        return (
            <Tooltip
                title={
                    <>
                        Edit this page <OpenInNew fontSize="inherit" />
                    </>
                }
                arrow
            >
                <IconButton
                    color="primary"
                    href={
                        (isExamplePages ? EXAMPLES_PATH : DOCS_PATH) + mdxPath
                    }
                    target="_blank"
                >
                    <GitHub />
                </IconButton>
            </Tooltip>
        )
    }

    return (
        <Button
            startIcon={<GitHub />}
            href={(isExamplePages ? EXAMPLES_PATH : DOCS_PATH) + mdxPath}
            target="_blank"
        >
            Edit this page
        </Button>
    )
}

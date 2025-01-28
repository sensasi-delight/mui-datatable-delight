'use client'

import { usePathname } from 'next/navigation'
import Button from '@mui/material/Button'
import GitHub from '@mui/icons-material/GitHub'

const BASE_URL =
    'https://github.com/sensasi-delight/mui-datatable-delight/edit/alpha'

const DOCS_PATH = BASE_URL + '/docs/app/(main)/docs/_mds'
const EXAMPLES_PATH = BASE_URL + '/docs/app/(main)'

export default function EditPageButton() {
    const pathname = usePathname()

    const isExamplePages = pathname.startsWith('/examples')

    const mdxPath = isExamplePages
        ? pathname + '/page.mdx'
        : pathname.replace('/docs', '') +
          (pathname.split('/').length === 3 ? '/index.mdx' : '.mdx')

    return (
        <Button
            startIcon={<GitHub />}
            href={(isExamplePages ? EXAMPLES_PATH : DOCS_PATH) + mdxPath}
            target="_blank"
            sx={{
                mb: 4
            }}
        >
            Edit this page
        </Button>
    )
}

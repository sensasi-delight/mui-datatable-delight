export default async function Page({
    params
}: {
    params: Promise<{ group: string; page: string }>
}) {
    const { group, page } = await params

    const { default: Page } = await import(`../..//_mds/${group}/${page}.mdx`)

    return <Page />
}

export function generateStaticParams() {
    return [{ group: 'getting-started', page: 'overview' }]
}

export const dynamicParams = false

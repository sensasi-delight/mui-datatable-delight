export default async function Page({
    params
}: {
    params: Promise<{ group: string }>
}) {
    const { group } = await params

    const { default: Page } = await import(`../_mds/${group}/index.mdx`)

    return <Page />
}

export function generateStaticParams() {
    return [{ group: 'getting-started' }, { group: 'api' }]
}

export const dynamicParams = false

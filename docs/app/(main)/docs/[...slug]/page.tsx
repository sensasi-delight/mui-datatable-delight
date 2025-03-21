import { Route } from '../_route--enum'

export default async function Page({
    params
}: {
    params: Promise<{ slug: string[] }>
}) {
    const { slug } = await params

    const { default: Page } = await import(
        `../_mds/${slug[0]}/${slug.length > 1 ? slug[1] : 'index'}.mdx`
    )
    // const { default: Page } = await import(`../_mds/getting-started/index.mdx`)

    return <Page />
}

export function generateStaticParams() {
    return getRoutes()
}

function getRoutes() {
    return (Object.keys(Route) as (keyof typeof Route)[])
        .filter(
            key =>
                // ignore examples cause it's handled separately on '/examples'
                !['GETTING_STARTED__EXAMPLES', 'GETTING_STARTED__API'].includes(
                    key
                )
        )
        .map(enumKey => ({
            slug: enumKey.toLowerCase().replaceAll('_', '-').split('--')
        }))
}

export const dynamicParams = false

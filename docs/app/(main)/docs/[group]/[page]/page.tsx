import { Route } from '../../_route--enum'

export default async function Page({
    params
}: {
    params: Promise<{ group: string; page: string }>
}) {
    const { group, page = 'overview' } = await params

    const { default: Page } = await import(`../../_mds/${group}/${page}.mdx`)

    return <Page />
}

export function generateStaticParams() {
    return getRouteData()
}

function getRouteData() {
    return Object.keys(Route)
        .filter(enumKey => enumKey.includes('__'))
        .map(enumKey => {
            const route = enumKey.replace('_', '-').split('--')

            return {
                group: route[0],
                page: route[1]
            }
        })
}

export const dynamicParams = false

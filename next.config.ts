import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
    pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
    reactStrictMode: true,

    output: 'export'
}

const withMDX = createMDX()

export default withMDX(nextConfig)

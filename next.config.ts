import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    output: 'export',
    pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
    reactStrictMode: true
}

const withMDX = createMDX()

export default withMDX(nextConfig)

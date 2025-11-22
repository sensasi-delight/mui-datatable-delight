import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
    reactCompiler: true,
    reactStrictMode: true
}

const withMDX = createMDX()

export default withMDX(nextConfig)

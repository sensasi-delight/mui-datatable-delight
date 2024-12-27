import { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
    pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
    reactStrictMode: true
}

const withMDX = createMDX()

export default withMDX(nextConfig)

import { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
    pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
    reactStrictMode: true,

    typescript: {
        /**
         * WILL REMOVE THIS AFTER ALL CODES ARE FULLY MIGRATE TO TYPESCRIPT
         */
        ignoreBuildErrors: true
    }
}

const withMDX = createMDX()

export default withMDX(nextConfig)

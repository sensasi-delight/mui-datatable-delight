import { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
    pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
    reactStrictMode: true,

    output: 'export',

    typescript: {
        /**
         * WILL REMOVE THIS AFTER ALL CODES ARE FULLY MIGRATE TO TYPESCRIPT
         */
        ignoreBuildErrors: true
    },

    eslint: {
        /**
         * WILL REMOVE THIS AFTER ALL CODES ARE FULLY MIGRATE TO TYPESCRIPT
         */
        ignoreDuringBuilds: true
    }
}

const withMDX = createMDX()

export default withMDX(nextConfig)

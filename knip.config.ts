import { type KnipConfig } from 'knip'

const config: KnipConfig = {
    $schema: 'https://unpkg.com/knip@5/schema.json',

    entry: 'src/index.ts',

    ignore: 'test/**/*',

    ignoreDependencies: [
        '@types/mdx',
        '@babel/preset-react', // used for rollup config on https://github.com/sensasi-delight/mui-datatable-delight/blob/next/rollup.config.mjs#L30
        '@babel/preset-typescript' // used for rollup config on https://github.com/sensasi-delight/mui-datatable-delight/blob/next/rollup.config.mjs#L30
    ],

    next: {
        entry: ['next.config.ts', 'docs/pages/**/*.tsx']
    },

    project: 'src/**/*.{ts,tsx}'
}

export default config

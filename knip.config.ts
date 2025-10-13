import { type KnipConfig } from 'knip'

const config: KnipConfig = {
    $schema: 'https://unpkg.com/knip@5/schema.json',

    entry: 'src/index.ts',

    ignore: 'test/**/*',

    next: {
        entry: ['next.config.ts', 'docs/pages/**/*.tsx']
    },

    project: 'src/**/*.{ts,tsx}'
}

export default config

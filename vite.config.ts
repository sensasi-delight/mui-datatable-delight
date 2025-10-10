import mdx from '@mdx-js/rollup'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
    plugins: [tsconfigPaths(), mdx(), react()],
    test: {
        coverage: {
            provider: 'v8'
        },
        environment: 'jsdom',
        globals: true
    }
})

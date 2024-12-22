import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

/**
 * @see https://vite.dev/config/
 */
export default defineConfig({
  plugins: [react()],
  root: 'examples-preview'
})

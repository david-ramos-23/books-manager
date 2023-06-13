/// <reference types="vitest" />
import eslintPlugin from '@nabla/vite-plugin-eslint'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => ({
	server: {
		proxy: {
			 // Using the proxy instance
			 '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
		}
	},
	test: {
		css: false,
		include: ['src/**/__tests__/*'],
		globals: true,
		environment: 'jsdom',
		setupFiles: 'src/setupTests.ts',
		clearMocks: true,
		coverage: {
			provider: 'istanbul',
			enabled: true,
			'100': true,
			reporter: ['text', 'lcov'],
			reportsDirectory: 'coverage'
		}
	},
	plugins: [
		tsconfigPaths(),
		react(),
		...(mode === 'test' ? [] : [eslintPlugin()])
	]
}))

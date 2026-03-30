import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import terser from '@rollup/plugin-terser';
import css from 'rollup-plugin-css-only';
import json from '@rollup/plugin-json';
import { spawn } from 'node:child_process';
import { randomFillSync, webcrypto } from 'node:crypto';

if (!globalThis.crypto) {
	if (webcrypto?.getRandomValues) {
		globalThis.crypto = webcrypto;
	} else {
		globalThis.crypto = {
			getRandomValues(typedArray) {
				return randomFillSync(typedArray);
			}
		};
	}
}

const { generateSW } = await import('rollup-plugin-workbox');

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.js',
	onwarn(warning, warn) {
		if (
			warning.code === 'CIRCULAR_DEPENDENCY' &&
			typeof warning.message === 'string' &&
			warning.message.includes('node_modules/svelte/src/internal')
		) {
			return;
		}

		warn(warning);
	},
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production,
				// Svelte 5 requires explicit client-side output
				generate: 'client'
			}
		}),
		json(),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			exportConditions: ['browser'],
			dedupe: ['svelte']
		}),
		commonjs(),
		generateSW({
			swDest: 'public/sw.js',
			globDirectory: 'public/',
			globPatterns: [
				'**/*.{html,json,js,css,png,svg}',
			],
			cleanupOutdatedCaches: true,
			navigateFallback: '/index.html',
			navigateFallbackDenylist: [/^\/api\//],
			offlineGoogleAnalytics: false,
			skipWaiting: true,
			clientsClaim: true,
			runtimeCaching: [
				{
					urlPattern: /^https:\/\/api\.coingecko\.com\/api\/v3\//,
					handler: 'NetworkFirst',
					method: 'GET',
					options: {
						cacheName: 'coingecko-api-v1',
						networkTimeoutSeconds: 5,
						expiration: {
							maxEntries: 60,
							maxAgeSeconds: 60 * 15,
						},
						cacheableResponse: {
							statuses: [0, 200],
						},
					},
				},
				{
					urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
					handler: 'StaleWhileRevalidate',
					method: 'GET',
					options: {
						cacheName: 'font-files-v1',
						expiration: {
							maxEntries: 20,
							maxAgeSeconds: 60 * 60 * 24 * 365,
						},
					},
				},
				{
					urlPattern: /\.(?:png|jpg|jpeg|svg|webp|gif)$/,
					handler: 'CacheFirst',
					method: 'GET',
					options: {
						cacheName: 'images-v1',
						expiration: {
							maxEntries: 80,
							maxAgeSeconds: 60 * 60 * 24 * 30,
						},
						cacheableResponse: {
							statuses: [0, 200],
						},
					},
				},
			],
		}),
		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};

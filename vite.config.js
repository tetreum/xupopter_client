import { sveltekit } from '@sveltejs/kit/vite';
import { setupEnv } from './setupEnv';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), setupEnv()],
	server: {
		port: process.env.BACKEND_PORT ? process.env.BACKEND_PORT : 8088,
	},
	envDir: "./config"
};

export default config;

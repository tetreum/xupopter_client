import { sveltekit } from '@sveltejs/kit/vite';
import { setupEnv } from './setupEnv';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), setupEnv()]
};

export default config;

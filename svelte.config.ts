import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';
import type { Config } from '@sveltejs/kit';

const config: Config = {
	kit: {
		adapter: adapter({
			runtime: 'nodejs18.x'
		})
	},
	preprocess: vitePreprocess()
};

export default config;

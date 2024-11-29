import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			runtime: 'nodejs20.x'
		}),
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore 404s on contact page
				if (path === '/contact' && message.includes('Cannot prerender pages with actions')) {
					return;
				}
				
				// Otherwise, throw the error
				throw new Error(message);
			}
		}
	},
	preprocess: vitePreprocess()
};

export default config; 
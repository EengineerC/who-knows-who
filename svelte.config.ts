import adapter from '@sveltejs/adapter-vercel';
import { Config } from '@sveltejs/kit';

const config: Config = {
	kit: {
		adapter: adapter()
	}
};

export default config;

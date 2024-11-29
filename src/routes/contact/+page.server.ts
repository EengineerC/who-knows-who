import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name');
		const email = data.get('email');
		const message = data.get('message');

		// Validate the data
		if (!name || !email || !message) {
			return fail(400, { error: 'All fields are required' });
		}

		// Here you would typically send the email or store the contact form data
		// For this example, we'll just simulate a delay
		await new Promise(resolve => setTimeout(resolve, 1000));

		return { success: true };
	}
}; 
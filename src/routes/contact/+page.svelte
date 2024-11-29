<script>
	import { enhance } from '$app/forms';

	let formSubmitted = false;
	let submitting = false;
</script>

<svelte:head>
	<title>Contact Us</title>
	<meta name="description" content="Get in touch with us" />
</svelte:head>

<div class="text-column">
	<h1>Contact Us</h1>

	{#if formSubmitted}
		<div class="success">
			<p>Thank you for your message! We'll get back to you soon.</p>
			<button on:click={() => formSubmitted = false}>Send another message</button>
		</div>
	{:else}
		<form
			method="POST"
			use:enhance={() => {
				submitting = true;
				return async ({ result }) => {
					submitting = false;
					if (result.type === 'success') {
						formSubmitted = true;
					}
				};
			}}
		>
			<div class="form-group">
				<label for="name">Name</label>
				<input type="text" id="name" name="name" required />
			</div>

			<div class="form-group">
				<label for="email">Email</label>
				<input type="email" id="email" name="email" required />
			</div>

			<div class="form-group">
				<label for="message">Message</label>
				<textarea id="message" name="message" rows="5" required></textarea>
			</div>

			<button type="submit" disabled={submitting}>
				{submitting ? 'Sending...' : 'Send Message'}
			</button>
		</form>
	{/if}
</div>

<style>
	.form-group {
		margin-bottom: 1.5rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: bold;
	}

	input,
	textarea {
		width: 100%;
		padding: 0.5rem;
		border: 1px solid var(--color-bg-1);
		border-radius: 4px;
		font-family: var(--font-body);
		background-color: var(--color-bg-0);
	}

	button {
		background-color: var(--color-theme-1);
		color: white;
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 4px;
		cursor: pointer;
		font-weight: bold;
		transition: background-color 0.2s;
	}

	button:hover {
		background-color: var(--color-theme-2);
	}

	button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.success {
		text-align: center;
		padding: 2rem;
		background-color: var(--color-bg-1);
		border-radius: 4px;
	}

	.success p {
		margin-bottom: 1.5rem;
		font-size: 1.2rem;
	}
</style> 
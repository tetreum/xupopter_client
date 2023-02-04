<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';

	export let form: ActionData;
</script>

<svelte:head>
	<title>Sign Up</title>
</svelte:head>

<div class="container mt-5">
	<div class="row">
		<div class="col-5 mx-auto bg-dark">
			<div class="text-center">
				<img src="/logo.png"  alt="logo">
			
				<h1>Sign Up</h1>
			</div>

			<section>
				<form method="post" use:enhance>
					<div class="mb-3">
						<label for="email">Email</label>
						<input type="email" class="form-control" name="email" id="email" required />
					</div>

					<div class="mb-3">
						<label for="password">Password</label>
						<input type="password" class="form-control" name="password" id="password" required />
					</div>

					<div class="mb-3">
						<button class="btn btn-primary w-100" type="submit">Sign Up</button>
					</div>

					{#if form?.error}
						<div class="notice error">
							{form.error}
						</div>
					{/if}
				</form>

				<div class="text-center mb-3 border-top border-primary pt-2">
					<a href="/login">Login</a>
				</div>
			</section>
		</div>
	</div>
</div>
<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';

	export let form: ActionData;
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="container">
	<div class="row">
		<div class="col-7 mx-auto">
			<div class="text-center">
				<img src="/logo.png"  alt="logo">
			
				<h1>Login</h1>
			</div>
			
			<section>
				<form method="post" use:enhance>
					<div class="mb-3">
						<label for="email" class="form-label">Email</label>
						<input name="email" class="form-control" type="email"  id="email" autofocus required />
					</div>
			
					<div class="mb-3">
						<label for="password" class="form-label">Password</label>
						<input type="password" name="password" id="password" class="form-control" required />
					</div>
			
					<div class="mb-3">
						<button class="btn btn-primary w-100" type="submit">Login</button>
					</div>
			
					{#if form?.error}
						<div class="alert alert-danger">
							{form.error}
						</div>
					{/if}
				</form>
			
				<div class="actions">
					<a href="/signup">Sign Up</a>
				</div>
			</section>
		</div>
	</div>
</div>


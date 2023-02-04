<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;

	const { user } = data;

	const runRecipe = (recipe) => {
		
	};
</script>

<svelte:head>
	<title>Recipes</title>
</svelte:head>

<section>
	<div class="d-flex justify-content-between">
		<h1>Recipes</h1>
		<a href="" class="btn btn-primary mb-0 my-auto">Create</a>
	</div>
	<div class="container-fluid">
		<div class="row">
			<div class="col-3 fw-bold">
				Name
			</div>
			<div class="col-2 fw-bold">
				Status
			</div>
			<div class="col-4 fw-bold">
				Options
			</div>
		</div>
		{#each data.recipes as recipe}
			<div class="row">
				<div class="col-3">
					{recipe.name}
				</div>
				<div class="col-2">
					{recipe.status}
				</div>
				<div class="col-4">
					<button on:mousedown={e => runRecipe(recipe)} class="btn btn-link"><i class="fa-solid fa-play"></i></button>
				</div>
			</div>
		{/each}
		{#if data.recipes.length === 0}
		<div>
			You have no recipes!
		</div>
		{/if}
	</div>
</section>

<style>
	section > * {
		margin-bottom: 2rem;
	}

	form button {
		width: fit-content;
	}
</style>

<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Recipe } from '@prisma/client';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { user } = data;

	onMount(() => {
		updateQueue();
		setInterval(updateQueue, 1000 * 30);
	});

	const stopRecipe = (recipe : Recipe) => {

	};

	const updateQueue = () => {
		data.recipes.forEach(recipe => {
			// @ts-ignore
			recipe.runners = [];
		});
		
		data.runners.forEach(async (runner) => {
			const queue : string[] = await (fetch(runner.address + '/api/queue', {
				method: "get",
				headers: {
					"Authorization": "Bearer " + data.token
				}
			})).then(response => response.json());

			queue.forEach(id => {
				const i = data.recipes.findIndex(r => r.id === id);
				const recipe = data.recipes[i];

				if (recipe) {
					// @ts-ignore
					recipe.runners.push(runner.id);
					data.recipes[i] = recipe;
				}
			});
		});
	};

	const removeRecipe = async (id : string) => {

		if (!confirm("U sure?")) {
			return;
		}

		await fetch('/api/recipes', {
			method: "delete",
			body: JSON.stringify({id}),
			headers: {
				"Authorization": "Bearer " + data.token
			}
		});

		const i = data.recipes.findIndex(r => r.id);
		data.recipes = data.recipes.slice(i);
	};

	const runRecipe = async (recipe : Recipe) => {
		if (data.runners.length === 0) {
			alert("You have no runners set");
			return;
		}
		if (data.runners.length === 1) {
			recipe.status = "sending";

			const runner = data.runners[0];

			try {
				fetch(runner.address, {
					method: "post",
					body: JSON.stringify(recipe),
					headers: {
						"Authorization": "Bearer " + data.token
					}
				});
				updateQueue();
			} catch (e) {
				recipe.status = "error";
			}
			
		} else {
			alert("ToDo: Runner selector");
		}
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
					{#if typeof recipe.runners === "undefined" || recipe.runners.length === 0}
						Idle
					{:else}
						Running
					{/if}
				</div>
				<div class="col-4">
					{#if typeof recipe.runners === "undefined" || recipe.runners.length === 0}
						<button on:mousedown={e => runRecipe(recipe)} class="btn btn-link"><i class="fa-solid fa-play"></i></button>
					{:else}
						<button on:mousedown={e => stopRecipe(recipe)} class="btn btn-link"><i class="fa-solid fa-stop"></i></button>
					{/if}
					<button on:mousedown={e => removeRecipe(recipe.id)} title="Delete" class="btn btn-link"><i class="fa-solid fa-trash-can text-danger"></i></button>
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

<script lang="ts">
	import type { Runner } from '@prisma/client';
	import RunnerModal from '../../../modals/RunnerModal.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { user } = data;

	let showNewModal : boolean = false;
	let selectedRunner : Runner | null = null;
	

	const remove = async (id : string) => {

		if (!confirm("U sure?")) {
			return;
		}

		await fetch('/api/runners/', {
			method: "delete",
			body: JSON.stringify({id}),
			headers: {
				"Authorization": "Bearer " + data.token
			}
		});

		const i = data.runners.findIndex(r => r.id);
		data.runners = data.runners.slice(i);
	};

	const edit = (runner : Runner) => {
		selectedRunner = runner;
		showNewModal = true;
	};

	const refreshData = () => {
		location.reload();
	}
</script>

<svelte:head>
	<title>Runners</title>
</svelte:head>

<section>
	<div class="d-flex justify-content-between">
		<h1>Runners</h1>
		<button on:mousedown={e => showNewModal = true} class="btn btn-primary mb-0 my-auto">Add</button>
	</div>
	<div class="container-fluid">
		<div class="row">
			<div class="col-3 fw-bold">
				Name
			</div>
			<div class="col-2 fw-bold">
				URL
			</div>
			<div class="col-4 fw-bold">
				Options
			</div>
		</div>
		{#each data.runners as runner}
			<div class="row">
				<div class="col-3">
					{runner.name}
				</div>
				<div class="col-2">
					{runner.address}
				</div>
				<div class="col-4">
					<button on:mousedown={e => edit(runner)} title="Edit" class="btn btn-link"><i class="fa-solid fa-pencil"></i></button>
					<button on:mousedown={e => remove(runner.id)} title="Delete" class="btn btn-link"><i class="fa-solid fa-trash-can text-danger"></i></button>
				</div>
			</div>
		{/each}
		{#if data.runners.length === 0}
		<div>
			You have no runners!
		</div>
		{/if}
	</div>
</section>
<RunnerModal bind:open={showNewModal} runner={selectedRunner} authToken={data.token} afterChanges={refreshData} />


<style>
	section > * {
		margin-bottom: 2rem;
	}

	form button {
		width: fit-content;
	}
</style>

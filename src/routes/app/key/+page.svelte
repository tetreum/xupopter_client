<script lang="ts">
    import { browser } from '$app/environment';
	import type { PageData } from './$types';

	export let data: PageData;

	const { user } = data;

	
</script>

<svelte:head>
	<title>Key</title>
</svelte:head>

<section>
    <h1>API linking</h1>
    <div class="container mt-5">

        <div class="input-group mb-3">
            <span class="input-group-text">Key</span>
            <input on:mouseup={e => e.target.select()} value="{user.apiKey}" class="form-control" type="text" readonly>
            <button title="Regenerate" class="btn btn-outline-secondary">
                <i class="fas fa-sync-alt"></i>
            </button>
        </div>
        {#if browser}
        <div class="input-group mb-3">
            <span class="input-group-text">Address</span>
            <input on:mouseup={e => e.target.select()} value="{location.origin}" class="form-control" type="text" readonly>
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">URI</span>
            <input on:mouseup={e => e.target.select()} value="{location.protocol}//{user.apiKey}@{location.host}" class="form-control" type="text" readonly>
        </div>
        {/if}
    </div>
</section>
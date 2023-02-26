<script lang="ts">
	import type { Runner } from "@prisma/client";


    export let open : boolean = false;
    export let showBackdrop : boolean = true;
    export let runner : Runner | null = null;
    export let onClosed : any = null;
    export let authToken : string;
    export let afterChanges : any = null;

    let name : string | null,
        address : string | null;

    let disableSubmit = false;
    let requested = false;

    const close = () => {
        open = false;
        if (onClosed) {
            onClosed();
        }
    }

    const submit = (e : any) => {
        disableSubmit = true;

        fetch('/api/runners/' + (runner ? '/' + runner.id : ''), {
			method: "post",
			body: JSON.stringify({
                name,
                address
            }),
			headers: {
				"Authorization": "Bearer " + authToken
			}
		}).then(response => {
            if (!runner) {
                reset();
            }
            disableSubmit = false;
            open = false;
            afterChanges();
        }).catch(error => {
            disableSubmit = false;

            console.error(error);
            alert("Error");
        });
    }

    function fillData (runner : Runner | null) {
        if (runner === null) {
            return;
        }
        name = runner.name;
        address = runner.address;
    }

    function reset () {
        name = '';
        address = '';
    }

    $: runner, fillData(runner);
    
    $: {
        if (open && !requested) {
            requested = true;
        }
    }
  </script>
{#if open}
<div class="modal fade show" tabindex="-1" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <form id="runner-form" on:submit|preventDefault={submit} method="post">
            <div class="modal-header">
                <h5 class="modal-title">
                    {#if runner }
                    Edit Runner
                    {:else}
                    New Runner
                    {/if}
                </h5>
                <button on:click="{close}" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label" for="">Name</label>
                        <input bind:value={name} type="text" class="form-control" required autofocus>
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="">URL</label>
                        <input bind:value={address} type="url" class="form-control" placeholder="http://..." required>
                    </div>
              </div>
              <div class="modal-footer d-flex justify-content-between">
                <button type="submit" class="btn btn-primary" disabled='{disableSubmit}'>Save</button>
              </div>
        </form>
      </div>
    </div>
</div>
    {#if showBackdrop}
        <div class="modal-backdrop show" />
    {/if}
{/if}
<style>
    .btn:has(.btn-check:checked)  {
        color: var(--bs-btn-hover-color);
        background-color: var(--bs-btn-hover-bg);
        border-color: var(--bs-btn-hover-border-color);
    }
</style>
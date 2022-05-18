<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { ColumnConfig } from './DataGrid';

	const configurationStore = writable(new ColumnConfig());
	setContext('datatableConf', configurationStore);

	export let records: any[];

	let widths: number[] = [];
	let leftOffset: number[] = [];

	$: {
		leftOffset = [0, ...widths];
	}
</script>

<div style:display="none"><slot /></div>
<div class="fillall" style:overflow="scroll">
	<table class="fillall" cellspacing="0">
		<thead>
			<tr>
				{#each $configurationStore.columnDefinition as column, idx}
					{#if column.sticky}
						<th class="sticky-header sticky-column" style:left={leftOffset[idx] + 'px'} bind:clientWidth={widths[idx]}>
							<svelte:component this={column.headerComponent}>{@html column.label}</svelte:component>
						</th>
					{:else}
						<th class="sticky-header">
							<svelte:component this={column.headerComponent}>{@html column.label}</svelte:component>
						</th>
					{/if}
				{/each}
			</tr>
		</thead>
		<tbody>
			{#await records}
				Loading...
			{:then data}
				{#each data as row}
					<tr>
						{#each $configurationStore.columnDefinition as column, idx}
							{@const formatResults = column.value(row)}
							{#if column.sticky}
								<th class="sticky-column cell" style:left={leftOffset[idx] + 'px'}>
									<svelte:component this={column.cellComponent}>{@html formatResults}</svelte:component>
								</th>
							{:else}
								<td class="cell">
									<svelte:component this={column.cellComponent}>{@html formatResults}</svelte:component>
								</td>
							{/if}
						{/each}
					</tr>
				{/each}
			{:catch error}
				error
			{/await}
		</tbody>
	</table>
</div>

<style>
	.fillall {
		width: 100%;
		height: 100%;
	}

	table {
		height: fit-content;
		max-height: 100%;
		border-spacing: 0;
		border-collapse: collapse;
	}

	table,
	tr,
	th,
	td {
		padding: 0px;
		margin: 0px;
		border-spacing: 0;
	}

	.sticky-header {
		position: sticky;
		top: 0px;
		text-align: left;
		z-index: 100;
		height: min-content;
	}

	.sticky-column {
		position: sticky;
		text-align: right;
		z-index: 150;
	}

	.sticky-column.sticky-header {
		z-index: 200000;
	}

	.cell {
		padding: 0px;
	}
</style>

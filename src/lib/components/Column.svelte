<script lang="ts">
	import { getContext } from 'svelte';
	import { get, type Writable } from 'svelte/store';
	import type { ColumnConfig } from './DataGrid';
	import DefaultCellComponent from './DefaultCellComponent.svelte';
	import DefaultHeaderComponent from './DefaultHeaderComponent.svelte';

	export let label = '&nbsp;';
	export let value: (row: any) => any;
	export let sticky = false;

	export let cellComponent = DefaultCellComponent;
	export let headerComponent = DefaultHeaderComponent;

	const configurationStore: Writable<ColumnConfig> = getContext('datatableConf');
	const { columnDefinition } = get(configurationStore);

	columnDefinition.push({ label, value, sticky, cellComponent, headerComponent });
	$configurationStore = $configurationStore;
</script>

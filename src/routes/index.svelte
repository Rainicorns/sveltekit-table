<script lang="ts">
	import Column from '$lib/components/Column.svelte';
	import DataGrid from '$lib/components/DataGrid.svelte';
	import { raw, checkbox } from '$lib/components/Renderers';
	import { faker } from '@faker-js/faker';

	const hugeDataset: any[] = Array.from({ length: 1000 }, () => {
		return {
			id: faker.datatype.uuid(),
			name: faker.name.findName(),
			email: faker.internet.email(),
			phone: faker.phone.phoneNumber(),
			address: faker.address.streetAddress(),
			username: faker.internet.userName(),
			website: faker.internet.url()
		};
	});

	import MyCell from './MyCell.svelte';
	const cellComponent = MyCell;

	let page = 1;
	let maxPages = hugeDataset.length / 100;

	let pageData:any[];
	$: pageData = hugeDataset.slice((page - 1) * 100, (page - 1) * 100 + 100);

	const next = () => {
		console.log('next');
		if(page < maxPages) {
			page++;
		}
	};

	const prev = () => {
		console.log('prev');
		if(page > 1) {
			page--;
		}
	};
</script>

<div class="docs">
	<h1>DataGrid with {hugeDataset.length} rows</h1>
	<div class="example">
		<DataGrid records={hugeDataset}>
			<Column sticky={true} value={checkbox('id')}  />
			<Column label="Name" sticky={true} value={raw('name')}  />
			<Column label="Email" value={raw('email')}  />
			<Column label="Phone" value={raw('phone')}  />
			<Column label="Username" value={raw('username')}  />
			<Column label="Website" value={raw('website')}  />
		</DataGrid>
	</div>

	<h1>DataGrid with paging rows</h1>
	Page {page} / {maxPages}
	<button on:click={next}>Next Page</button>
	<button on:click={prev}>Prev Page</button>
	<div class="example">
		<DataGrid records={pageData}>
			<Column sticky={true} value={checkbox('id')} sort="" />
			<Column label="Name" sticky={true} value={raw('name')} sort="" />
			<Column label="Email" value={raw('email')} sort="" />
			<Column label="Phone" value={raw('phone')} sort="" />
			<Column label="Username" value={raw('username')} sort="" />
			<Column label="Website" value={raw('website')} sort="" />
		</DataGrid>
	</div>
</div>

<style>
	.docs {
		width: 80vw;
		margin-left: auto;
		margin-right: auto;
	}

	.example {
		width: 100%;
		height: 80vh;
		border: 1px solid black;
		margin-left: auto;
		margin-right: auto;
		overflow: hidden;
	}
</style>

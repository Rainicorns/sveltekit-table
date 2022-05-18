# sveltekit-table

## Description
It's a Sveltekit Datagrid with a sticky header and sticky columns.


## Installation and Usage
```bash
# create a new project in the current directory
npm install -D sveltekit-table
```

```typescript
	import Column from '$lib/components/Column.svelte';
	import DataGrid from '$lib/components/DataGrid.svelte';
```

...and then declaritively use.

```jsx
    <DataGrid records={hugeDataset}>
        <Column sticky={true} value={checkbox('id')}  />
        <Column label="Name" sticky={true} value={raw('name')}  />
        <Column label="Email" value={raw('email')}  />
        <Column label="Phone" value={raw('phone')}  />
        <Column label="Username" value={raw('username')} sort="" />
        <Column label="Website" value={raw('website')} sort="" />
    </DataGrid>
```

Column takes a function value that recieves a row in the records and outputs a value. For example, if you would like a column
that combines first and last name:

```jsx
    <Column label="Name" sticky={true} value={(row)=> `${row.last_name}, ${row.first_name}`} />
```

Columns can also take a cellComponent and a headerComponent. For example the default cellComponent looks like this:

```jsx
// slot is passed the output of the value function
<div class="cell"><slot /></div>
<style>
	.cell {
		background-color: white;
		white-space: nowrap;
		border: 1px solid grey;
		margin: 0px;
		margin-bottom: -1px;
		margin-top: -1px;
        padding: 0.25rem;
        font-weight: normal;
	}
</style>
```

If you wanted to provide your own, just import it and pass it.
```typescript
    import MyCellComponent from './MyCellComponent.svelte';
```

and then

```jsx
     <Column label="Name" sticky={true} value={raw('name')}  cellComponent={MyCellComponent}/>
```




## Basic Demo and Example
https://svelte.dev/repl/476923e68cd1473bac0057612b148d65?version=3.48.0

```bash
# create a new project in the current directory
npm install -D sveltekit-table
```

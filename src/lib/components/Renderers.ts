

export function raw(field:string) {
    return (row:any) => row[field];
}


export function checkbox(field:string) {
    return (row:any) => '<input type="checkbox" />';
}
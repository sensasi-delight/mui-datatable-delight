import DataTable, { type DataTableProps } from '@src'

export default function Example() {
    const columns = ['Name', 'Title', 'Location']

    const data = [
        ['Gabby George', 'Business Analyst', 'Minneapolis'],
        ['Aiden Lloyd', 'Business Consultant', 'Dallas'],
        ['Jaden Collins', 'Attorney', 'Santa Ana'],
        ['Franky Rees', 'Business Analyst', 'St. Petersburg'],
        ['Aaren Rose', null, 'Toledo']
    ]

    const options: DataTableProps['options'] = {
        download: false,
        filter: false,
        print: false,
        responsive: 'vertical',
        search: false,
        viewColumns: false
    }

    return <DataTable columns={columns} data={data} options={options} />
}

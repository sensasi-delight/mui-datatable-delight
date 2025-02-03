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
        filter: false,
        search: false,
        print: false,
        download: false,
        viewColumns: false,
        responsive: 'vertical'
    }

    return <DataTable data={data} columns={columns} options={options} />
}

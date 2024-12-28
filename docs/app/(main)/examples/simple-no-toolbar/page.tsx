import DataTable from '@src'

export default function Page() {
    const columns = ['Name', 'Title', 'Location']

    const data = [
        ['Gabby George', 'Business Analyst', 'Minneapolis'],
        ['Aiden Lloyd', 'Business Consultant', 'Dallas'],
        ['Jaden Collins', 'Attorney', 'Santa Ana'],
        ['Franky Rees', 'Business Analyst', 'St. Petersburg'],
        ['Aaren Rose', null, 'Toledo']
    ]

    const options = {
        filter: false,
        search: false,
        print: false,
        download: false,
        viewColumns: false,
        responsive: 'vertical' as 'vertical'
    }

    return <DataTable data={data} columns={columns} options={options} />
}

import MUIDataTable from '../../src/'

export default function SamplePage() {
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
        // customToolbar: null,
        responsive: 'vertical'
    }

    return <MUIDataTable data={data} columns={columns} options={options} />
}

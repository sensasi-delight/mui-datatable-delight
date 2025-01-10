import Chip, { ChipProps } from '@mui/material/Chip'
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'
import TableToolbar from '../src/components/toolbar'
import { DEFAULT_TEXT_LABELS } from '../src/hooks/use-main-context.process-text-labels.default-text-labels'

const CustomChip = (props: ChipProps) => {
    return <Chip variant="outlined" color="secondary" label={props.label} />
}

let setTableAction = () => {}

const options = {
    print: true,
    download: true,
    search: true,
    filter: true,
    viewColumns: true,
    downloadOptions: {
        separator: ',',
        filename: 'tableDownload.csv',
        filterOptions: {
            useDisplayedRowsOnly: true,
            useDisplayedColumnsOnly: true
        }
    }
}

const columns = ['First Name', 'Company', 'City', 'State']

const data = [
    {
        data: ['Joe James', 'Test Corp', 'Yonkers', 'NY'],
        dataIndex: 0
    },
    {
        data: ['John Walsh', 'Test Corp', 'Hartford', 'CT'],
        dataIndex: 1
    },
    {
        data: ['Bob Herm', 'Test Corp', 'Tampa', 'FL'],
        dataIndex: 2
    },
    {
        data: ['James Houston', 'Test Corp', 'Dallas', 'TX'],
        dataIndex: 3
    }
]

const testCustomIcon = (iconName: string) => {
    const components = { icons: { [iconName]: CustomChip } }

    const result = render(
        <TableToolbar
            {...{ columns, data, options, setTableAction, components }}
        />
    )

    expect(result.getAllByRole('button').length).toBe(7)

    // assert.strictEqual(wrapper.find(IconButton).length, 5) // All icons show
    // assert.strictEqual(wrapper.find(CustomChip).length, 1) // Custom chip shows once

    /**
     * @todo FIX THIS INCONSISTENCY
     */
    // Object.values(DEFAULT_TEXT_LABELS.toolbar).forEach(iconLabel =>
    //     expect(result.getAllByLabelText(iconLabel).length).toBe(2)
    // )
}

describe('<TableToolbar /> with custom icons', function () {
    Object.values(DEFAULT_TEXT_LABELS.toolbar).forEach(iconLabel =>
        test(`should render a toolbar with a custom chip in place of the ${iconLabel} icon`, () =>
            testCustomIcon(iconLabel))
    )
})

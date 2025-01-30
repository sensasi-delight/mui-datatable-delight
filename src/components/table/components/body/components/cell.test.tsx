import DataTable, { type DataTableProps } from '@src/index'
import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

describe('<TableBodyCell />', function () {
    const data = [
        ['Joe James', 'Test Corp', 'Yonkers', 'NY'],
        ['John Walsh', 'Test Corp', 'Hartford', null],
        ['Bob Herm', 'Test Corp X', 'Tampa', 'FL'],
        ['James Houston', 'Test Corp', 'Dallas', 'TX']
    ]

    const columns: DataTableProps['columns'] = [
        {
            name: 'Name'
        },
        'Company',
        {
            name: 'City',
            label: 'City Label',
            options: { filterType: 'textField' }
        },
        {
            name: 'State',
            options: { filterType: 'multiselect' }
        },
        { name: 'Empty', options: { empty: true, filterType: 'checkbox' } }
    ]

    function setup(props?: Partial<DataTableProps>) {
        return render(
            <DataTable
                data={data}
                columns={columns}
                {...props}
                options={{
                    selectableRows: 'none',
                    ...props?.options
                }}
            />
        )
    }

    it('should execute `onCellClick` prop when clicked if provided', () => {
        let clickCount = 0
        let rowIndex, colIndex, cellData

        const result = setup({
            options: {
                onCellClick(val, colMeta) {
                    clickCount++
                    colIndex = colMeta.colIndex
                    rowIndex = colMeta.rowIndex
                    cellData = val
                }
            }
        })

        /**
         * tableRows[0] is the header.
         * tableRows[1-4] are the body rows.
         */
        const tableRows = result.getAllByRole('row')

        if (
            tableRows.length === 0 ||
            !tableRows[1] ||
            !tableRows[1].children[0]
        ) {
            throw new Error('Cell not found')
        }

        // simulate click on 1st cell of 1st body row
        fireEvent.click(tableRows[1].children[0])

        expect(clickCount).toBe(1)
        expect(rowIndex).toBe(0)
        expect(colIndex).toBe(0)
        expect(cellData).toBe('Joe James')

        if (!tableRows[4] || !tableRows[4].children[2]) {
            throw new Error('Cell not found')
        }

        // simulate click on 3rd cell of 3rd body row
        fireEvent.click(tableRows[4].children[2])

        expect(clickCount).toBe(2)
        expect(rowIndex).toBe(3)
        expect(colIndex).toBe(2)
        expect(cellData).toBe('Dallas')

        if (!tableRows[3] || !tableRows[3].children[1]) {
            throw new Error('Cell not found')
        }

        // simulate click on 2nd cell of 3rd body row
        fireEvent.click(tableRows[3].children[1])

        expect(clickCount).toBe(3)
        expect(rowIndex).toBe(2)
        expect(colIndex).toBe(1)
        expect(cellData).toBe('Test Corp X')
    })
})

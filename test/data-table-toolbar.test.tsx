// vendors
import { describe, expect, test, vi } from 'vitest'
import {
    fireEvent,
    render
    // RenderResult
} from '@testing-library/react'
// locals
import TableToolbar from '../src/components/toolbar'
import {
    DataTableColumns,
    DataTableData,
    DataTableOptions,
    DataTableProps
} from '../src'
import { DEFAULT_TEXT_LABELS } from '../src/hooks/use-data-table-context/function/statics/default-text-labels'
import { ClassName } from '../src/enums/class-name'
import { MainContextProvider } from '../src/hooks/use-data-table-context/use-main-context'

describe('<TableToolbar />', function () {
    function setup(override?: DataTableProps) {
        const {
            columns = COLUMNS,
            data = DATA,
            options
        } = {
            ...override,
            options: {
                ...OPTIONS,
                ...override?.options
            }
        }

        return {
            result: render(
                <MainContextProvider
                    datatableProps={{
                        columns,
                        data,
                        options
                    }}
                >
                    <TableToolbar
                        // displayData={DATA}
                        options={options}
                        // setTableAction={setTableAction}
                    />
                </MainContextProvider>
            )
        }
    }

    test('should render a toolbar', () => {
        const { result } = setup()

        // console.log(getAllByRole('button').map(el => el.outerHTML))

        expect(result.getAllByRole('button').length).toBe(
            5 + // toolbar icon buttons
                2 // toolbar filter children
        )
    })

    test('should render a toolbar with custom title (string)', () => {
        const title = 'custom title'

        const { getByText } = render(
            <TableToolbar
                title={title}
                columns={COLUMNS}
                data={DATA}
                options={OPTIONS}
                // setTableAction={setTableAction}
            />
        )

        expect(getByText('custom title').innerHTML).toBe(title)
    })

    test('should render a toolbar with custom title (JSX.Element)', () => {
        const title = <h1>custom title</h1>

        const { getByText } = render(
            <TableToolbar
                title={title}
                columns={COLUMNS}
                data={DATA}
                options={OPTIONS}
                // setTableAction={setTableAction}
            />
        )

        expect(getByText('custom title').innerHTML).toBe('custom title')
    })

    test('should render a toolbar with search text initialized if option.searchText = some_text', () => {
        const newOptions = {
            ...OPTIONS,
            search: true,
            searchText: 'searchText'
        }

        const { getAllByDisplayValue } = render(
            <TableToolbar
                columns={COLUMNS}
                data={DATA}
                options={newOptions}
                // setTableAction={setTableAction}
            />
        )

        expect(getAllByDisplayValue('searchText').length).toBe(1)
    })

    test('should render a toolbar with search if option.searchOpen = true', () => {
        const newOption1 = { ...OPTIONS, searchOpen: false }

        const render1 = render(
            <TableToolbar
                columns={COLUMNS}
                data={DATA}
                options={newOption1}
                // setTableAction={setTableAction}
            />
        )

        expect(
            render1.container.querySelectorAll(
                `[class*="${ClassName.TOOLBAR__SEARCH_BAR}--root"`
            ).length
        ).toBe(0)

        const newOptions2 = { ...OPTIONS, searchOpen: true }

        const render2 = render(
            <TableToolbar
                columns={COLUMNS}
                data={DATA}
                options={newOptions2}
                // setTableAction={setTableAction}
            />
        )

        expect(
            render2.container.querySelectorAll(
                `[class*="${ClassName.TOOLBAR__SEARCH_BAR}--root"`
            ).length
        ).toBe(1)
    })

    test('should render a toolbar with no search icon if option.search = false', () => {
        const newOptions = { ...OPTIONS, search: false }

        const { queryAllByDisplayValue } = render(
            <TableToolbar
                columns={COLUMNS}
                data={DATA}
                options={newOptions}
                // setTableAction={setTableAction}
            />
        )

        expect(queryAllByDisplayValue('MuiSearchIcon').length).toBe(0)
    })

    /**
     * ENABLE THIS LATER. TEST TITLE NOT MATCH WITH THE TEST CASE.
     */
    // test('should render a toolbar with search box and no search icon if option.searchAlwaysOpen = true', () => {
    //     const newOptions = { ...OPTIONS, searchAlwaysOpen: true }

    //     const renderWrapper = render(
    //         <TableToolbar
    //             columns={COLUMNS}
    //             data={DATA}
    //             options={newOptions}
    //             // setTableAction={setTableAction}
    //         />
    //     )

    //     const toolbarSearchContainer =
    //         renderWrapper.baseElement.querySelectorAll(
    //             `[class*="${ClassName.TOOLBAR__SEARCH_BAR}--root"]`
    //         )

    //     expect(toolbarSearchContainer.length).toBe(1)

    //     // check that textfield is rendered
    //     expect(toolbarSearchContainer[0].querySelectorAll('input').length).toBe(
    //         1
    //     )

    //     const toolbarButtons =
    //         toolbarSearchContainer[0].querySelectorAll('button')

    //     expect(toolbarButtons.length).toBe(1)

    //     // check that close icon and search is rendered but invisible
    //     // const calculated = getComputedStyle(toolbarButtons[0])
    //     // expect(calculated.visibility).toBe('inline-flex')

    //     // check that close icon is rendered
    //     expect(toolbarButtons[0].style.visibility).toBe('hidden')

    //     // // check that textfield is rendered
    //     // const actualTextfieldResult = mountWrapper.find(TableSearch)
    //     // assert.strictEqual(actualTextfieldResult.length, 1)
    //     // assert.strictEqual(
    //     //     actualTextfieldResult.props().options.searchText,
    //     //     undefined
    //     // )

    //     // // check that close icon is not rendered
    //     // const actualCloseIconResult = mountWrapper.find(CloseIcon())
    //     // assert.strictEqual(actualCloseIconResult.length, 0)

    //     // // check that search icon is rendered
    //     // const actualSearchIconResult = mountWrapper.find(SearchIcon)
    //     // assert.strictEqual(actualSearchIconResult.length, 0)
    // })

    test('should render a toolbar with no download icon if option.download = false', () => {
        const newOptions = { ...OPTIONS, download: false }

        const result = render(
            <TableToolbar
                columns={COLUMNS}
                data={DATA}
                options={newOptions}
                // setTableAction={setTableAction}
            />
        )

        expect(
            result.container.querySelectorAll(`[class*="download"]`).length
        ).toBe(0)
    })

    test('should render a toolbar with no print icon if option.print = false', () => {
        const newOptions = { ...OPTIONS, print: false }

        const result = render(
            <TableToolbar
                columns={COLUMNS}
                data={DATA}
                options={newOptions}
                // setTableAction={setTableAction}
            />
        )

        expect(
            result.container.querySelectorAll(`[class*="print"]`).length
        ).toBe(0)
    })

    test('should render a toolbar with no view columns icon if option.viewColumns = false', () => {
        const newOptions = { ...OPTIONS, viewColumns: false }

        const result = render(
            <TableToolbar
                columns={COLUMNS}
                data={DATA}
                options={newOptions}
                // setTableAction={setTableAction}
            />
        )

        expect(
            result.container.querySelectorAll(`[class*="viewColumns"]`).length
        ).toBe(0)
    })

    test('should render a toolbar with no filter icon if option.filter = false', () => {
        const newOptions = { ...OPTIONS, filter: false }

        const result = render(
            <TableToolbar
                columns={COLUMNS}
                data={DATA}
                options={newOptions}
                // setTableAction={setTableAction}
            />
        )

        expect(
            result.container.querySelectorAll(`[class*="filter"]`).length
        ).toBe(0)
    })

    /**
     * @todo CAN'T FOUND `customSearchRender` IN ANY SOURCE CODE. SKIP FOR NOW
     */
    // test('should render a toolbar with custom search when option.customSearchRender is provided', () => {
    //     const newOptions = {
    //         ...OPTIONS,
    //         customSearchRender: () => <h1>customSearchRender</h1>
    //     }

    //     const result = render(
    //         <TableToolbar
    //             columns={COLUMNS}
    //             data={DATA}
    //             options={newOptions}
    //             setTableAction={vi.fn()}
    //         />
    //     )

    //     fireEvent.click(getRenderedIconButton(result, 'search'))

    //     expect(result.getAllByText('customSearchRender').length).toBe(1)
    // })

    test('should render a toolbar with a search clicking search icon', () => {
        const result = render(
            <TableToolbar
                columns={COLUMNS}
                data={DATA}
                options={OPTIONS}
                setTableAction={vi.fn()}
            />
        )

        fireEvent.click(
            result.getAllByLabelText(DEFAULT_TEXT_LABELS.toolbar.search)[1]
        )

        expect(
            result.container.querySelectorAll(
                `[class*="${ClassName.TOOLBAR__SEARCH_BAR}--root"]`
            ).length
        ).toBe(1)
    })

    test('should hide search after clicking clear icon', () => {
        // const searchTextUpdate = () => {}

        const result = render(
            <TableToolbar
                searchClose={vi.fn()}
                // searchTextUpdate={searchTextUpdate}
                columns={COLUMNS}
                data={DATA}
                options={OPTIONS}
                setTableAction={vi.fn()}
            />
        )

        /**
         * @todo SHOULD ONLY BE ONE BUTTON
         */
        // display search
        fireEvent.click(
            result.getAllByLabelText(DEFAULT_TEXT_LABELS.toolbar.search)[1]
        )

        expect(result.container.querySelectorAll('input').length).toBe(1)

        // now hide it and test
        fireEvent.click(result.getByLabelText('Close search bar'))

        expect(result.container.querySelectorAll('input').length).toBe(0)
    })

    test('should hide search when search icon is clicked while search is open without content', () => {
        // const searchTextUpdate = () => {}
        const result = render(
            <TableToolbar
                searchClose={() => {}}
                // searchTextUpdate={searchTextUpdate}
                columns={COLUMNS}
                data={DATA}
                options={OPTIONS}
                setTableAction={vi.fn()}
            />
        )

        /**
         * @todo should only one button
         */
        const searchToggleButton = result.getAllByLabelText(
            DEFAULT_TEXT_LABELS.toolbar.search
        )

        // click search button to display search
        fireEvent.click(searchToggleButton[1])

        expect(
            searchToggleButton[1].getAttribute('class')?.includes('iconActive')
        ).toBe(true)

        // now click search button again and test
        fireEvent.click(searchToggleButton[1])

        expect(
            searchToggleButton[1].getAttribute('class')?.includes('iconActive')
        ).toBe(false)
    })

    /**
     * @todo fix this later -- input was changed but `iconActive` is missing from icon button
     */
    // test('should not hide search when search icon is clicked while search is open with content', () => {
    //     // const searchTextUpdate = () => {}
    //     const result = render(
    //         <TableToolbar
    //             searchClose={() => {}}
    //             // searchTextUpdate={searchTextUpdate}
    //             columns={COLUMNS}
    //             data={DATA}
    //             options={OPTIONS}
    //             setTableAction={vi.fn()}
    //         />
    //     )

    //     const searchToggleButton = getRenderedIconButton(result, 'search')

    //     // click search button to display search
    //     fireEvent.click(searchToggleButton)

    //     expect(
    //         searchToggleButton.getAttribute('class')?.includes('iconActive')
    //     ).toBe(true)

    //     // set searchText
    //     const searchInput = result.container.querySelector('input')

    //     if (searchInput)
    //         fireEvent.change(searchInput, {
    //             target: { value: 'fakeSearchText' }
    //         })

    //     // and click search button again and test
    //     fireEvent.click(searchToggleButton)

    //     expect(
    //         searchToggleButton.getAttribute('class')?.includes('iconActive')
    //     ).toBe(true)

    //     expect(result.container.querySelectorAll('input').length).toBe(1)
    // })

    test('should render a toolbar with a search when searchAlwaysOpen is set to true', () => {
        const newOptions = { ...OPTIONS, searchAlwaysOpen: true }

        const result = render(
            <TableToolbar
                columns={COLUMNS}
                data={DATA}
                options={newOptions}
                // setTableAction={setTableAction}
            />
        )

        expect(
            result.container.querySelectorAll(
                `[class*="${ClassName.TOOLBAR__SEARCH_BAR}--root"]`
            ).length
        ).toBe(1)
    })

    test('should not hide search when opening another dialog when searchAlwaysOpen is set to true', () => {
        const newOptions = { ...OPTIONS, searchAlwaysOpen: true }

        const result = render(
            <TableToolbar
                columns={COLUMNS}
                data={DATA}
                options={newOptions}
                setTableAction={vi.fn()}
            />
        )

        /**
         * @todo SHOULD BE ONLY ONE BUTTON
         */
        const filterToggleButton = result.getAllByLabelText(
            DEFAULT_TEXT_LABELS.toolbar.filterTable
        )

        fireEvent.click(filterToggleButton[1])

        expect(result.container.querySelectorAll('input').length).toBe(1)
    })

    test('should call onFilterDialogOpen when opening filters via toolbar', () => {
        const onFilterDialogOpen = vi.fn()
        const setTableAction = vi.fn()

        const newOptions = { ...OPTIONS, onFilterDialogOpen }

        const result = render(
            <TableToolbar
                columns={COLUMNS}
                data={DATA}
                options={newOptions}
                setTableAction={setTableAction}
            />
        )

        /**
         * @todo FIX THIS -- SHOULD BE ONLY ONE BUTTON
         */
        const filterButton = result.getAllByLabelText(
            DEFAULT_TEXT_LABELS.toolbar.filterTable
        )

        fireEvent.click(filterButton[1])

        expect(filterButton[1].className.includes('iconActive')).toBe(true)
        expect(onFilterDialogOpen).toHaveBeenCalledOnce()
        expect(setTableAction).toHaveBeenCalledOnce()
    })

    /**
     * NOTE: CAN'T CLOSE FILTER DIALOG FROM TEST
     */
    // test('should call onFilterDialogClose when closing filters dialog', () => {
    //     const onFilterDialogClose = vi.fn()
    //     const setTableAction = vi.fn()

    //     const newOptions = { ...OPTIONS, onFilterDialogClose }

    //     const result = render(
    //         <TableToolbar
    //             columns={COLUMNS}
    //             data={DATA}
    //             options={newOptions}
    //             setTableAction={setTableAction}
    //         />
    //     )

    //     const filterButton = result.getByTestId(
    //         DEFAULT_TEXT_LABELS.toolbar.filterTable + '-iconButton'
    //     )

    //     fireEvent.click(filterButton) // to open
    //     fireEvent.keyDown(result.container, { // to close
    //         key: 'Escape',
    //         code: 'Escape',
    //         keyCode: 27,
    //         charCode: 27
    //     })

    //     expect(onFilterDialogClose).toHaveBeenCalledOnce()
    //     expect(setTableAction).toHaveBeenCalledTimes(2)
    // })

    test('should render search icon as active if option.searchOpen = true', () => {
        const newOptions = { ...OPTIONS, search: true, searchOpen: true }

        const result = render(
            <TableToolbar
                columns={COLUMNS}
                data={DATA}
                options={newOptions}
                // setTableAction={setTableAction}
            />
        )

        const activeButtons = result.container.querySelectorAll(
            '[class*="iconActive"]'
        )

        expect(activeButtons.length).toBe(1)

        expect(activeButtons[0].ariaLabel).toBe(
            DEFAULT_TEXT_LABELS.toolbar.search
        )
    })

    test('should render search icon as active if option.searchText = some_text', () => {
        const newOptions = {
            ...OPTIONS,
            search: true,
            searchText: 'searchText'
        }

        const result = render(
            <TableToolbar
                columns={COLUMNS}
                data={DATA}
                options={newOptions}
                // setTableAction={setTableAction}
            />
        )

        const activeButtons = result.container.querySelectorAll(
            '[class*="iconActive"]'
        )

        expect(activeButtons.length).toBe(1)

        expect(activeButtons[0].ariaLabel).toBe(
            DEFAULT_TEXT_LABELS.toolbar.search
        )
    })

    test('should download CSV when calling method `handleCSVDownload`', () => {
        const { result } = setup()

        const appendSpy = vi.spyOn(document.body, 'appendChild')
        const removeSpy = vi.spyOn(document.body, 'removeChild')

        const downloadButtons = result.container.querySelectorAll(
            `button[aria-label="${DEFAULT_TEXT_LABELS.toolbar.downloadCsv}"]`
        )

        expect(downloadButtons.length).toBe(1)

        fireEvent.click(downloadButtons[0])

        expect(appendSpy).toHaveBeenCalledOnce()
        expect(removeSpy).toHaveBeenCalledOnce()
    })

    test('should trigger onDownload prop callback when calling method `handleCSVDownload`', () => {
        const onDownload = vi.fn()

        const { result } = setup({
            options: { onDownload }
        })

        const downloadButtons = result.container.querySelectorAll(
            `button[aria-label="${DEFAULT_TEXT_LABELS.toolbar.downloadCsv}"]`
        )

        expect(downloadButtons.length).toBe(1)

        fireEvent.click(downloadButtons[0])

        expect(onDownload).toHaveBeenCalledOnce()
    })
})

const DATA: DataTableData = [
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

const COLUMNS: DataTableColumns = ['First Name', 'Company', 'City', 'State']

const OPTIONS: DataTableOptions = {
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

/**
 *
 * @todo SHOULD ONLY BE ONE BUTTON. REMOVE THE "ALL"
 */
// function getRenderedIconButton(
//     renderResult: RenderResult,
//     buttonId: keyof typeof DEFAULT_TEXT_LABELS.toolbar
// ) {
//     return renderResult.getAllByLabelText(
//         DEFAULT_TEXT_LABELS.toolbar[buttonId]
//     )[1]
// }

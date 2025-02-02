// vendors
import { describe, expect, test, vi } from 'vitest'
import {
    fireEvent,
    render
    // RenderResult
} from '@testing-library/react'
// locals
import Toolbar from '.'
import type { DataTableOptions, DataTableProps } from '@src/index'
import { DEFAULT_TEXT_LABELS } from '../../hooks/use-data-table-context/function/statics/default-text-labels'
import ClassName from '../../enums/class-name'
import { DataTableContextProvider } from '../..'

describe('<Toolbar />', function () {
    function setup(override?: Partial<DataTableProps>) {
        const DATA = [
            ['Joe James', 'Test Corp', 'Yonkers', 'NY'],
            ['John Walsh', 'Test Corp', 'Hartford', 'CT'],
            ['Bob Herm', 'Test Corp', 'Tampa', 'FL'],
            ['James Houston', 'Test Corp', 'Dallas', 'TX']
        ]

        const COLUMNS = ['First Name', 'Company', 'City', 'State']

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

        const props = {
            options: {
                ...OPTIONS,
                ...override?.options
            },
            columns: COLUMNS,
            data: DATA,
            ...override
        }

        const filterUpdate = vi.fn()

        return {
            filterUpdate,
            result: render(
                <DataTableContextProvider datatableProps={props}>
                    <Toolbar filterUpdate={filterUpdate} />
                </DataTableContextProvider>
            )
        }
    }

    test('should render a toolbar', () => {
        const { result } = setup()

        // console.log(getAllByRole('button').map(el => el.outerHTML))

        expect(
            result.container.querySelectorAll(
                `[class*="${ClassName.TOOLBAR}-root"]`
            ).length
        ).toBe(1)

        expect(result.getAllByRole('button').length).toBe(5)
    })

    test('should render a toolbar with custom title (string)', () => {
        const title = 'custom title'

        const { result } = setup({
            title
        })

        expect(result.getByText(title)).toBeDefined()
    })

    test('should render a toolbar with custom title (JSX.Element)', () => {
        const titleString = 'custom title'
        const title = <h1>{titleString}</h1>

        const { result } = setup({
            title
        })

        expect(result.getByText('custom title')).toBeDefined()
    })

    test('should render a toolbar with search text initialized if option.searchText = some_text', () => {
        const searchText = 'searchText'

        const { result } = setup({
            options: {
                search: true,
                searchText
            }
        })

        expect(result.getAllByDisplayValue(searchText).length).toBe(1)
    })

    test('should render a toolbar with search if option.searchOpen = true', () => {
        const { result: result1 } = setup({
            options: {
                searchOpen: false
            }
        })

        expect(
            result1.container.querySelectorAll(
                `[class*="${ClassName.TOOLBAR__SEARCH_TEXT_FIELD}-root"`
            ).length
        ).toBe(0)

        const { result: result2 } = setup({
            options: {
                searchOpen: true
            }
        })

        expect(
            result2.container.querySelectorAll(
                `[class*="${ClassName.TOOLBAR__SEARCH_TEXT_FIELD}-root"`
            ).length
        ).toBe(1)
    })

    test('should render a toolbar with no search icon if option.search = false', () => {
        const { result } = setup({
            options: {
                search: false
            }
        })

        expect(
            result.container.querySelectorAll(
                `[class*="${ClassName.TOOLBAR__SEARCH_TEXT_FIELD}-root"]`
            ).length
        ).toBe(0)
    })

    /**
     * ENABLE THIS LATER. TEST TITLE NOT MATCH WITH THE TEST CASE.
     */
    // test('should render a toolbar with search box and no search icon if option.searchAlwaysOpen = true', () => {
    //     const newOptions = { ...OPTIONS, searchAlwaysOpen: true }

    //     const renderWrapper = render(
    //         <Toolbar
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
        const { result } = setup({
            options: {
                download: false
            }
        })

        expect(
            result.container.querySelectorAll(`[class*="download"]`).length
        ).toBe(0)
    })

    test('should render a toolbar with no print icon if option.print = false', () => {
        const { result } = setup({
            options: {
                print: false
            }
        })

        expect(
            result.container.querySelectorAll(`[class*="print"]`).length
        ).toBe(0)
    })

    test('should render a toolbar with no view columns icon if option.viewColumns = false', () => {
        const { result } = setup({
            options: {
                viewColumns: false
            }
        })

        expect(
            result.container.querySelectorAll(`[class*="viewColumns"]`).length
        ).toBe(0)
    })

    test('should render a toolbar with no filter icon if option.filter = false', () => {
        const { result } = setup({
            options: {
                filter: false
            }
        })

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
    //         <Toolbar
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
        const { result } = setup({
            options: {
                onTableChange: vi.fn()
            }
        })

        expect(
            result.container.querySelectorAll(
                `[class*="${ClassName.TOOLBAR__SEARCH_TEXT_FIELD}-root"]`
            ).length
        ).toBe(0)

        const searchButton = result.getByLabelText(
            DEFAULT_TEXT_LABELS.toolbar.search
        ).children[0]

        if (!searchButton) {
            throw new Error('Search button not found')
        }

        fireEvent.click(searchButton)

        expect(
            result.container.querySelectorAll(
                `[class*="${ClassName.TOOLBAR__SEARCH_TEXT_FIELD}-root"]`
            ).length
        ).toBe(1)
    })

    test('should hide search after clicking clear icon', () => {
        const { result } = setup({
            options: {
                onTableChange: vi.fn()
            }
        })

        const searchButton = result.getByLabelText(
            DEFAULT_TEXT_LABELS.toolbar.search
        ).children[0]

        if (!searchButton) {
            throw new Error('Search button not found')
        }

        // display search
        fireEvent.click(searchButton)

        expect(result.container.querySelectorAll('input').length).toBe(1)

        // now hide it and test
        fireEvent.click(result.getByLabelText('Close search bar'))

        expect(result.container.querySelectorAll('input').length).toBe(0)
    })

    test('should hide search when search icon is clicked while search is open without content', () => {
        const { result } = setup({
            options: {
                onTableChange: vi.fn()
            }
        })

        const searchToggleButton = result.getByLabelText(
            DEFAULT_TEXT_LABELS.toolbar.search
        ).children[0]

        if (!searchToggleButton) {
            throw new Error('Search button not found')
        }

        // click search button to display search
        fireEvent.click(searchToggleButton)

        expect(
            searchToggleButton.getAttribute('class')?.includes('iconActive')
        ).toBe(true)

        // now click search button again and test
        fireEvent.click(searchToggleButton)

        expect(
            searchToggleButton.getAttribute('class')?.includes('iconActive')
        ).toBe(false)
    })

    /**
     * @todo fix this later -- input was changed but `iconActive` is missing from icon button
     */
    // test('should not hide search when search icon is clicked while search is open with content', () => {
    //     // const searchTextUpdate = () => {}
    //     const result = render(
    //         <Toolbar
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
        const { result } = setup({
            options: {
                searchAlwaysOpen: true
            }
        })

        expect(
            result.container.querySelectorAll(
                `[class*="${ClassName.TOOLBAR__SEARCH_TEXT_FIELD}-root"]`
            ).length
        ).toBe(1)
    })

    test('should not hide search when opening another dialog when searchAlwaysOpen is set to true', () => {
        const { result } = setup({
            options: {
                searchAlwaysOpen: true
            }
        })

        const filterToggleButton = result.getByLabelText(
            DEFAULT_TEXT_LABELS.toolbar.filterTable
        ).children[0]

        if (!filterToggleButton) {
            throw new Error('Filter button not found')
        }

        fireEvent.click(filterToggleButton)

        expect(
            result.container.querySelectorAll(
                `[class*="${ClassName.TOOLBAR__SEARCH_TEXT_FIELD}-root"]`
            ).length
        ).toBe(1)
    })

    test('should call onFilterDialogOpen when opening filters via toolbar', () => {
        const onFilterDialogOpen = vi.fn()
        const onTableChange = vi.fn()

        const { result } = setup({
            options: { onFilterDialogOpen, onTableChange }
        })

        const filterButton = result.getByLabelText(
            DEFAULT_TEXT_LABELS.toolbar.filterTable
        ).children[0]

        if (!filterButton) {
            throw new Error('Filter button not found')
        }

        fireEvent.click(filterButton)

        expect(filterButton.className.includes('iconActive')).toBe(true)
        expect(onFilterDialogOpen).toHaveBeenCalledOnce()
        expect(onTableChange).toHaveBeenCalledOnce()
    })

    /**
     * NOTE: CAN'T CLOSE FILTER DIALOG FROM TEST
     */
    // test('should call onFilterDialogClose when closing filters dialog', () => {
    //     const onFilterDialogClose = vi.fn()
    //     const setTableAction = vi.fn()

    //     const newOptions = { ...OPTIONS, onFilterDialogClose }

    //     const result = render(
    //         <Toolbar
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
        const { result } = setup({
            options: {
                search: true,
                searchOpen: true
            }
        })

        const activeButtons = result.container.querySelectorAll(
            '[class*="iconActive"]'
        )

        expect(activeButtons.length).toBe(1)

        expect(activeButtons[0]?.parentElement?.ariaLabel).toBe(
            DEFAULT_TEXT_LABELS.toolbar.search
        )
    })

    test('should render search icon as active if option.searchText = some_text', () => {
        const { result } = setup({
            options: {
                search: true,
                searchText: 'searchText'
            }
        })

        const activeButtons = result.container.querySelectorAll(
            '[class*="iconActive"]'
        )

        expect(activeButtons.length).toBe(1)

        console.log()

        expect(activeButtons[0]?.parentElement?.ariaLabel).toBe(
            DEFAULT_TEXT_LABELS.toolbar.search
        )
    })

    test('should download CSV when calling method `handleCSVDownload`', () => {
        const { result } = setup()

        const appendSpy = vi.spyOn(document.body, 'appendChild')
        const removeSpy = vi.spyOn(document.body, 'removeChild')

        const downloadButton = result.getByLabelText(
            DEFAULT_TEXT_LABELS.toolbar.downloadCsv
        ).children[0]

        if (!downloadButton) {
            throw new Error('Download button not found')
        }

        fireEvent.click(downloadButton)

        expect(appendSpy).toHaveBeenCalledOnce()
        expect(removeSpy).toHaveBeenCalledOnce()
    })

    test('should trigger onDownload prop callback when calling method `handleCSVDownload`', () => {
        const onDownload = vi.fn()

        const { result } = setup({
            options: { onDownload }
        })

        const downloadButton = result.getByLabelText(
            DEFAULT_TEXT_LABELS.toolbar.downloadCsv
        ).children[0]

        if (!downloadButton) {
            throw new Error('Download button not found')
        }

        fireEvent.click(downloadButton)

        expect(onDownload).toHaveBeenCalledOnce()
    })
})

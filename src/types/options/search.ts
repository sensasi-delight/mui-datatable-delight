import type { TextFieldProps } from '@mui/material/TextField'
import type { BooleanOrDisabled } from '../values/boolean-or-disabled'

export default interface DataTableSearchOptions {
    /**
     * Override default search with custom function.
     *
     * @see https://github.com/sensasi-delight/mui-datatable-delight/blob/main/examples/customize-search/index.tsx
     */
    customSearch?: (
        searchText: string,
        currentRow: any[],
        columns: any[]
    ) => boolean

    /** Callback function that triggers when the search text value has changed. */
    onSearchChange?: (searchText?: string) => void

    /** Callback function that triggers when the searchbox closes. */
    onSearchClose?: () => void

    /** Callback function that triggers when the searchbox opens.  */
    onSearchOpen?: () => void

    /**
     * Possible Values:
     * - true       = Button visible and clickable
     * - false      = Button not visible
     * - 'disabled' = Button is visible but not clickable
     *
     * @default true
     */
    search?: BooleanOrDisabled

    /**
     * Initially displays search bar.
     * @default false
     */
    searchOpen?: boolean

    /**
     * Always displays search bar, and hides search icon in toolbar.
     *
     * @default false
     */
    searchAlwaysOpen?: boolean

    /**
     * The delay in milliseconds to wait before triggering the search.
     * For example, setting searchDelay: 300 means the search will only execute 300ms after the user stops typing.
     *
     * @see https://mui-datatable-delight.vercel.app/features/debounce-search
     *
     * @default 0
     */
    searchDelay?: number

    /**
     * Props applied to the search text box. You can set method callbacks like onBlur, onKeyUp, etc, this way.
     *
     * @see https://github.com/sensasi-delight/mui-datatable-delight/blob/main/examples/customize-search/index.tsx
     */
    searchProps?: TextFieldProps

    /**
     * Search text placeholder.
     *
     * @see https://github.com/sensasi-delight/mui-datatable-delight/blob/main/examples/customize-search/index.tsx
     */
    searchPlaceholder?: string

    /** Search text for the table. */
    searchText?: string
}

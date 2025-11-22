import type { DataTableOptions } from '@src/types/options'

export function hasToolbarItem<T>(options: DataTableOptions<T>) {
    // Populate this list with anything that might render in the toolbar to determine if we hide the toolbar
    const TOOLBAR_ITEMS = [
        'title',
        'filter',
        'search',
        'print',
        'download',
        'viewColumns',
        'customToolbar'
    ]

    return TOOLBAR_ITEMS.some(itemName =>
        Object.keys(options).includes(itemName)
    )
}

enum TableAction {
    SORT = 'sort',
    CHANGE_ROWS_PER_PAGE = 'changeRowsPerPage',
    COLUMN_ORDER_CHANGE = 'columnOrderChange',
    CHANGE_PAGE = 'changePage',
    INITIALIZED = 'tableInitialized',
    PROP_UPDATE = 'propsUpdate',
    RESET_FILTERS = 'resetFilters',
    FILTER_CHANGE = 'filterChange',
    ON_SEARCH_CLOSE = 'onSearchClose',
    ON_SEARCH_OPEN = 'onSearchOpen',
    ROW_DELETE = 'rowDelete',
    ROW_EXPANSION_CHANGE = 'rowExpansionChange',
    ROW_SELECTION_CHANGE = 'rowSelectionChange',
    ON_FILTER_DIALOG_OPEN = 'onFilterDialogOpen',
    ON_FILTER_DIALOG_CLOSE = 'onFilterDialogClose',
    EXPAND_ROW = 'expandRow',
    SEARCH = 'search',
    VIEW_COLUMNS_CHANGE = 'viewColumnsChange'
}

export default TableAction

enum ComponentClassName {
    ROOT = 'datatable-delight',
    ANNOUNCE_TEXT = ROOT + '__announce-text',
    BOTTOM_BAR = ROOT + '__bottom-bar',
    COLUMN_RESIZER = ROOT + '__column-resizer',
    FILTERED_VALUES_LIST = ROOT + '__filtered-values-list',
    SELECTED_ROWS_TOOLBAR = ROOT + '__selected-rows-toolbar',
    TABLE = ROOT + '__table',
    TOOLBAR = ROOT + '__toolbar',

    BOTTOM_BAR__JUMP_TO_PAGE = BOTTOM_BAR + '__jump-to-page',
    BOTTOM_BAR__PAGINATION = BOTTOM_BAR + '__pagination',

    TABLE__BODY = TABLE + '__body',
    TABLE__HEAD = TABLE + '__head',
    TABLE__CHECKBOX_CELL = TABLE + '__checkbox-cell',

    TABLE__BODY__CELL = TABLE__BODY + '__cell',
    TABLE__BODY__ROW = TABLE__BODY + '__row',

    TABLE__HEAD__CELL = TABLE__HEAD + '__cell',

    TOOLBAR__COLUMN_VISIBILITIES_BOX = TOOLBAR + '__column-visibilities-box',
    TOOLBAR__DATA_FILTER_BOX = TOOLBAR + '__data-filter-box',
    TOOLBAR__DOWNLOAD_BUTTON = TOOLBAR + '__download-button',
    TOOLBAR__POPOVER = TOOLBAR + '__popover',
    TOOLBAR__PRINT_BUTTON = TOOLBAR + '__print-button',
    TOOLBAR__SEARCH_TEXT_FIELD = TOOLBAR + '__search-text-field'
}

export default ComponentClassName

import type { DataTableProps } from '../../../data-table.props.type'
import { type DataTableOptions, STP } from '../../../data-table.props.type/options'
import { warnDeprecated, warnInfo } from '../../../functions'

export function handleDeprecatedOptions(
    props: DataTableProps,
    options: DataTableOptions & DeprecatedOptions
) {
    if (typeof options?.selectableRows === 'boolean') {
        warnDeprecated(
            'Using a boolean for selectableRows has been deprecated. Please use string option: multiple | single | none'
        )

        // options.selectableRows = options.selectableRows ? 'multiple' : 'none'
    }

    if (
        options?.responsive !== undefined &&
        ['standard', 'vertical', 'verticalAlways', 'simple'].indexOf(
            options.responsive
        ) === -1
    ) {
        if (
            [
                'scrollMaxHeight',
                'scrollFullHeight',
                'stacked',
                'stackedFullWidth',
                'scrollFullHeightFullWidth',
                'scroll'
            ].indexOf(options.responsive) !== -1
        ) {
            warnDeprecated(
                options.responsive +
                    ' has been deprecated, but will still work in version 3.x. Please use string option: standard | vertical | simple. More info: https://github.com/gregnb/mui-datatables/tree/master/docs/v2_to_v3_guide.md'
            )
        } else {
            warnInfo(
                options.responsive +
                    ' is not recognized as a valid input for responsive option. Please use string option: standard | vertical | simple. More info: https://github.com/gregnb/mui-datatables/tree/master/docs/v2_to_v3_guide.md'
            )
        }
    }

    if (options?.onRowsSelect) {
        warnDeprecated(
            'onRowsSelect has been renamed onRowSelectionChange. More info: https://github.com/gregnb/mui-datatables/tree/master/docs/v2_to_v3_guide.md'
        )
    }

    if (options?.onRowsExpand) {
        warnDeprecated(
            'onRowsExpand has been renamed onRowExpansionChange. More info: https://github.com/gregnb/mui-datatables/tree/master/docs/v2_to_v3_guide.md'
        )
    }

    if (options?.fixedHeaderOptions) {
        if (
            typeof options.fixedHeaderOptions.yAxis !== 'undefined' &&
            typeof options.fixedHeader === 'undefined'
        ) {
            options.fixedHeader = options.fixedHeaderOptions.yAxis
        }
        if (
            typeof options.fixedHeaderOptions.xAxis !== 'undefined' &&
            typeof options.fixedSelectColumn === 'undefined'
        ) {
            options.fixedSelectColumn = options.fixedHeaderOptions.xAxis
        }
        warnDeprecated(
            'fixedHeaderOptions will still work but has been deprecated in favor of fixedHeader and fixedSelectColumn. More info: https://github.com/gregnb/mui-datatables/tree/master/docs/v2_to_v3_guide.md'
        )
    }

    if (options?.serverSideFilterList) {
        warnDeprecated(
            'serverSideFilterList will still work but has been deprecated in favor of the confirmFilters option. See this example for details: https://github.com/gregnb/mui-datatables/blob/master/examples/serverside-filters/index.js More info here: https://github.com/gregnb/mui-datatables/tree/master/docs/v2_to_v3_guide.md'
        )
    }

    props.columns.map(column => {
        if (
            typeof column === 'object' &&
            column.options &&
            column.options.customFilterListRender
        ) {
            warnDeprecated(
                'The `customFilterListRender` option has been deprecated. It is being replaced by `customFilterListOptions.render` (Specify customFilterListOptions: { render: Function } in column options.)'
            )
        }
    })

    if (options?.disableToolbarSelect === true) {
        warnDeprecated(
            'disableToolbarSelect has been deprecated but will still work in version 3.x. It is being replaced by "selectToolbarPlacement"="none". More info: https://github.com/gregnb/mui-datatables/tree/master/docs/v2_to_v3_guide.md'
        )
    }

    // only give this warning message in newer browsers
    if (
        options?.selectToolbarPlacement &&
        Object.values(STP).indexOf(options.selectToolbarPlacement) === -1
    ) {
        warnInfo(
            'Invalid option value for `selectToolbarPlacement`. Please check the documentation: https://github.com/gregnb/mui-datatables#options'
        )
    }
}

interface DeprecatedOptions {
    /** @deprecated use `selectToolbarPlacement` instead */
    disableToolbarSelect?: boolean
}

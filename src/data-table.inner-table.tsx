import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useMainContext } from './hooks/use-main-context'
import { DataTableOptions } from './data-table.props.type/options'
import { makeStyles } from 'tss-react/mui'
import { Table } from './components/table'
import { TableProps } from './components/table/types'

export function InnerTable({
    forwardUpdateDividers,
    forwardSetHeadResizable,

    tableRef,
    selectRowUpdate,
    setHeadCellRef,
    draggableHeadCellRefs,
    getCurrentRootRef,
    timers
}: {
    forwardUpdateDividers: (fn: () => void) => void
    forwardSetHeadResizable: (fn: () => void) => void

    tableRef: TableProps['ref']
    selectRowUpdate: unknown
    setHeadCellRef: unknown
    draggableHeadCellRefs: HTMLTableCellElement[]
    getCurrentRootRef: unknown
    timers: unknown
}) {
    const { classes } = useStyles()
    const { components, options } = useMainContext()

    const { tableHeightVal, responsiveClass } =
        getTableHeightAndResponsiveClasses(options, classes)

    return (
        <div
            style={{ position: 'relative', ...tableHeightVal }}
            className={responsiveClass}
        >
            {options.resizableColumns && (
                <components.ColumnsResizer
                    updateDividers={forwardUpdateDividers}
                    // @ts-expect-error WILL FIX THIS LATER
                    setResizable={forwardSetHeadResizable}
                />
            )}

            {/* @ts-expect-error WILL FIX THIS LATER */}
            <DndProvider
                backend={HTML5Backend}
                context={typeof window === 'undefined' ? undefined : window}
            >
                <Table
                    ref={tableRef}
                    {...{
                        selectRowUpdate,
                        setHeadCellRef,
                        draggableHeadCellRefs,
                        getCurrentRootRef,
                        timers
                    }}
                />
            </DndProvider>
        </div>
    )
}

function getTableHeightAndResponsiveClasses(
    options: DataTableOptions,
    classes: ReturnType<typeof useStyles>['classes']
) {
    const responsiveOption = options.responsive

    let maxHeight = options.tableBodyMaxHeight
    let responsiveClass

    switch (responsiveOption) {
        // deprecated
        case 'scroll':
            responsiveClass = classes.responsiveScroll
            maxHeight = '499px'
            break
        // deprecated
        case 'scrollMaxHeight':
            responsiveClass = classes.responsiveScrollMaxHeight
            maxHeight = '499px'
            break
        // deprecated
        case 'scrollFullHeight':
            responsiveClass = classes.responsiveScrollFullHeight
            maxHeight = 'none'
            break
        // deprecated
        case 'scrollFullHeightFullWidth':
            responsiveClass = classes.responsiveScrollFullHeight
            break
        // deprecated
        case 'stacked':
            responsiveClass = classes.responsiveStacked
            maxHeight = 'none'
            break
        // deprecated
        case 'stackedFullWidth':
            responsiveClass = classes.responsiveStackedFullWidth
            maxHeight = 'none'
            break

        default:
            responsiveClass = classes.responsiveBase
            break
    }

    const tableHeightVal = {
        maxHeight: maxHeight,
        height: options.tableBodyHeight
    }

    return {
        tableHeightVal,
        responsiveClass
    }
}

const useStyles = makeStyles({
    name: 'datatable-delight'
})(theme => ({
    responsiveBase: {
        overflow: 'auto',
        '@media print': {
            height: 'auto !important'
        }
    },

    // deprecated, but continuing support through v3.x
    responsiveScroll: {
        overflow: 'auto',
        height: '100%'
    },
    // deprecated, but continuing support through v3.x
    responsiveScrollMaxHeight: {
        overflow: 'auto',
        height: '100%'
    },
    // deprecated, but continuing support through v3.x
    responsiveScrollFullHeight: {
        height: '100%'
    },
    // deprecated, but continuing support through v3.x
    responsiveStacked: {
        overflow: 'auto',
        [theme.breakpoints.down('md')]: {
            overflow: 'hidden'
        }
    },
    // deprecated, but continuing support through v3.x
    responsiveStackedFullWidth: {}
}))

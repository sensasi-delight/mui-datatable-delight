import { tss } from 'tss-react/mui'

export const useStyles = tss
    .withName('datatable-delight--head--cell')
    .create(({ theme }) => ({
        root: {},
        fixedHeader: {
            position: 'sticky',
            top: '0px',
            zIndex: 1
        },
        tooltip: {
            cursor: 'pointer'
        },
        myPopper: {
            '&[data-x-out-of-boundaries]': {
                display: 'none'
            }
        },
        data: {
            display: 'inline-block'
        },
        sortAction: {
            display: 'flex',
            cursor: 'pointer'
        },
        dragCursor: {
            cursor: 'grab'
        },
        sortLabelRoot: {
            height: '20px'
        },
        sortActive: {
            color: theme.palette.text.primary
        },
        toolButton: {
            textTransform: 'none',
            marginLeft: '-8px',
            minWidth: 0,
            marginRight: '8px',
            paddingLeft: '8px',
            paddingRight: '8px'
        },
        contentWrapper: {
            display: 'flex',
            alignItems: 'center'
        },
        hintIconAlone: {
            marginTop: '-3px',
            marginLeft: '3px'
        },
        hintIconWithSortIcon: {
            marginTop: '-3px'
        }
    }))

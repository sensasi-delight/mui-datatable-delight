import { tss } from 'tss-react/mui'
import { ClassName } from '../enums'

export const useStyles = tss.withName(ClassName.ROOT).create({
    root: {
        '& .datatables-no-print': {
            '@media print': {
                display: 'none'
            }
        }
    },
    paper: {
        isolation: 'isolate'
    },
    paperResponsiveScrollFullHeightFullWidth: {
        position: 'absolute'
    }
})

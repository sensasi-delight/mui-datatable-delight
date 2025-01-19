import { TableRow } from '@mui/material'
import { tss } from 'tss-react/mui'

export default function TableHeadRow({
    children
}: {
    children: React.ReactNode
}) {
    const { classes } = useStyles()

    return <TableRow className={classes.root}>{children}</TableRow>
}

const useStyles = tss.withName('datatable-delight--head--row').create({
    root: {}
})

import { TableRow } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles({ name: 'datatable-delight--head--row' })(() => ({
    root: {}
}))

export default function TableHeadRow({
    children
}: {
    children: React.ReactNode
}) {
    const { classes } = useStyles()

    return <TableRow className={classes.root}>{children}</TableRow>
}

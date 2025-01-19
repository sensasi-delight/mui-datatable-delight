import { tss } from 'tss-react/mui'
import { ClassName } from '../../../enums'

export const useStyles = tss.withName(ClassName.TABLE).create({
    root: {
        outline: 'none'
    }
})

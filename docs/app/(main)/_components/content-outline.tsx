import MenuList from '@mui/material/MenuList'
import Typography from '@mui/material/Typography'

import ContentOutlineItems from './content-outline-items'

export default function ContentOutline() {
    return (
        <>
            <Typography>Contents</Typography>

            <MenuList dense component="div">
                <ContentOutlineItems />
            </MenuList>
        </>
    )
}

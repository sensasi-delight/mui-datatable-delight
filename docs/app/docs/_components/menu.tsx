import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListSubheader
} from '@mui/material'
import Link from 'next/link'

const drawerWidth = 240

export default function Menu({
    isOpen,
    toggle
}: {
    isOpen: boolean
    toggle: () => void
}) {
    return (
        <Drawer
            open={isOpen}
            anchor="left"
            onClose={toggle}
            variant="persistent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box'
                }
            }}
        >
            <List component="nav">
                <ListSubheader>Getting Started</ListSubheader>
                <SandboxItem
                    href="/docs/getting-started/overview"
                    name="Overview"
                />

                {sandboxes.map((item, i) => (
                    <SandboxItem key={i} href={item.href} name={item.name} />
                ))}
            </List>
        </Drawer>
    )
}

const sandboxes = [
    // {
    //     name: 'Custom Component',
    //     href: 'https://codesandbox.io/embed/xrvrzryjvp?autoresize=1&hidenavigation=1'
    // },
    // {
    //     name: 'Customize Columns',
    //     href: 'https://codesandbox.io/embed/xowj5oj8w?autoresize=1&hidenavigation=1'
    // },
    // {
    //     name: 'Customize Footer',
    //     href: 'https://codesandbox.io/embed/5z0w0w9jyk?autoresize=1&hidenavigation=1'
    // },
    // {
    //     name: 'Customize Styling',
    //     href: 'https://codesandbox.io/embed/0ylq1lqwp0?autoresize=1&hidenavigation=1'
    // },
    // {
    //     name: 'Customize Toolbar',
    //     href: 'https://codesandbox.io/embed/wy2rl1nyzl?autoresize=1&hidenavigation=1'
    // },
    // {
    //     name: 'Customize ToolbarSelect',
    //     href: 'https://codesandbox.io/embed/545ym5ov6p?autoresize=1&hidenavigation=1'
    // },
    // {
    //     name: 'Resizable Columns',
    //     href: 'https://codesandbox.io/embed/q8w3230qpj?autoresize=1&hidenavigation=1'
    // }
]

const SandboxItem = ({ href, name }: { href: string; name: string }) => (
    <ListItem disablePadding>
        <ListItemButton href={href} LinkComponent={Link}>
            <ListItemText primary={name} />
        </ListItemButton>
    </ListItem>
)

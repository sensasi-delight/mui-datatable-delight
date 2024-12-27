import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListSubheader
} from '@mui/material'

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
            <List
                component="nav"
                subheader={<ListSubheader>Examples</ListSubheader>}
            >
                {sandboxes.map((item, i) => (
                    <SandboxItem key={i} href={item.href} name={item.name} />
                ))}
            </List>
        </Drawer>
    )
}

const sandboxes = [
    {
        name: 'Custom Component',
        href: 'https://codesandbox.io/embed/xrvrzryjvp?autoresize=1&hidenavigation=1'
    },
    {
        name: 'Customize Columns',
        href: 'https://codesandbox.io/embed/xowj5oj8w?autoresize=1&hidenavigation=1'
    },
    {
        name: 'Customize Footer',
        href: 'https://codesandbox.io/embed/5z0w0w9jyk?autoresize=1&hidenavigation=1'
    },
    {
        name: 'Customize Styling',
        href: 'https://codesandbox.io/embed/0ylq1lqwp0?autoresize=1&hidenavigation=1'
    },
    {
        name: 'Customize Toolbar',
        href: 'https://codesandbox.io/embed/wy2rl1nyzl?autoresize=1&hidenavigation=1'
    },
    {
        name: 'Customize ToolbarSelect',
        href: 'https://codesandbox.io/embed/545ym5ov6p?autoresize=1&hidenavigation=1'
    },
    {
        name: 'Resizable Columns',
        href: 'https://codesandbox.io/embed/q8w3230qpj?autoresize=1&hidenavigation=1'
    }
]

const SandboxItem = ({ href, name }: { href: string; name: string }) => (
    <ListItem disablePadding>
        <ListItemButton
            onClick={() => window.open(href, '_blank')}
            sx={{
                py: 0
            }}
        >
            <ListItemText primary={name} />
        </ListItemButton>
    </ListItem>
)

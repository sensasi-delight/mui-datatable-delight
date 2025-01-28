import type { MDXComponents } from 'mdx/types'
import Alert from '@mui/material/Alert'
import Link from '@mui/material/Link'
import LinkIcon from '@mui/icons-material/Link'
import Typography, { type TypographyProps } from '@mui/material/Typography'
import { CodeSnippet, InlineCode } from './components'
import { Mermaid } from './app/(main)/_components/mermaid'
import type { JSX } from 'react'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        pre: props => {
            const lang = props.children.props.className.replace('language-', '')

            if (lang === 'mermaid')
                return <Mermaid>{props.children.props.children}</Mermaid>

            return (
                <CodeSnippet
                    language={lang}
                    text={props.children.props.children}
                />
            )
        },
        code: ({ children }) => <InlineCode text={children} />,
        h1: ({ children }) => (
            <Typography variant="h3" component="h1" mt={3} mb={4}>
                {children}
            </Typography>
        ),
        h2: ({ children }) => (
            <HeadingLink variant="h4" component="h2">
                {children}
            </HeadingLink>
        ),
        h3: ({ children }) => (
            <HeadingLink variant="h5" component="h3">
                {children}
            </HeadingLink>
        ),

        blockquote: ({ children }) => (
            <Alert
                component="blockquote"
                elevation={1}
                color="info"
                icon={false}
                sx={{
                    m: 0,
                    '& p': {
                        m: 0
                    },
                    borderLeft: 6,
                    boxShadow: 'none'
                }}
            >
                {children}
            </Alert>
        ),
        a: props => <Link {...props} />,
        p: ({ children }) => (
            <Typography lineHeight={2} my={3}>
                {children}
            </Typography>
        ),
        ...components
    }
}

function HeadingLink({
    children,
    variant,
    component
}: {
    children: JSX.Element
    variant: TypographyProps['variant']
    component: Exclude<TypographyProps['component'], undefined>
}) {
    const text = toText(children)

    return (
        <Link
            href={`#${text}`}
            display="flex"
            alignItems="baseline"
            gap={1}
            sx={{
                textDecoration: 'none',
                color: 'inherit',
                pt: 1,
                my: 3,
                wordBreak: 'break-all',

                ':hover': {
                    '& svg': {
                        display: 'block'
                    }
                }
            }}
        >
            <Typography
                id={text}
                variant={variant}
                component={component}
                sx={{
                    scrollMarginTop: '96px'
                }}
            >
                {children}
            </Typography>

            <LinkIcon
                sx={{
                    display: 'none',
                    color: 'primary.main',
                    transform: 'translateY(4px)'
                }}
            />
        </Link>
    )
}

function toText(children: JSX.Element): string {
    return (
        typeof children === 'string'
            ? children
            : children.props &&
                typeof children.props === 'object' &&
                'children' in children.props
              ? (children.props.children as string)
              : ''
    )
        .toLowerCase()
        .replace(/[^0-9A-Z ]+/gi, '')
        .trim()
        .replaceAll(' ', '-')
}

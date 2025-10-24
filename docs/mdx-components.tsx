import LinkIcon from '@mui/icons-material/Link'
import Alert from '@mui/material/Alert'
import Link from '@mui/material/Link'
import Typography, { type TypographyProps } from '@mui/material/Typography'
import type { MDXComponents } from 'mdx/types'
import type { JSX } from 'react'
import { Mermaid } from './app/(main)/_components/mermaid'
import { CodeSnippet, InlineCode } from './components'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        a: props => <Link {...props} />,

        blockquote: ({ children }) => (
            <Alert
                color="info"
                component="blockquote"
                elevation={1}
                icon={false}
                sx={{
                    '& p': {
                        m: 0
                    },
                    borderLeft: 6,
                    boxShadow: 'none',
                    m: 0
                }}
            >
                {children}
            </Alert>
        ),
        code: ({ children }) => <InlineCode text={children} />,
        h1: ({ children }) => (
            <Typography component="h1" mb={4} mt={3} variant="h3">
                {children}
            </Typography>
        ),
        h2: ({ children }) => (
            <HeadingLink component="h2" variant="h4">
                {children}
            </HeadingLink>
        ),
        h3: ({ children }) => (
            <HeadingLink component="h3" variant="h5">
                {children}
            </HeadingLink>
        ),
        p: ({ children }) => (
            <Typography lineHeight={2} my={3}>
                {children}
            </Typography>
        ),
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
            alignItems="baseline"
            display="flex"
            gap={1}
            href={`#${text}`}
            sx={{
                ':hover': {
                    '& svg': {
                        display: 'block'
                    }
                },
                color: 'inherit',
                my: 3,
                pt: 1,
                textDecoration: 'none',
                wordBreak: 'break-all'
            }}
        >
            <Typography
                component={component}
                id={text}
                sx={{
                    scrollMarginTop: '96px'
                }}
                variant={variant}
            >
                {children}
            </Typography>

            <LinkIcon
                sx={{
                    color: 'primary.main',
                    display: 'none',
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
        .replace(/ /g, '-')
}

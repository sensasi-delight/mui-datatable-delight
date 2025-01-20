import type { MDXComponents } from 'mdx/types'
import { Alert, Link, Typography } from '@mui/material'
import { CodeSnippet, InlineCode } from './components'
import { Mermaid } from './app/(main)/_components/mermaid'

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
            <Typography variant="h3" component="h1">
                {children}
            </Typography>
        ),
        h2: ({ children }) => (
            <Typography variant="h4" component="h2" pt={1}>
                {children}
            </Typography>
        ),
        h3: ({ children }) => (
            <Typography variant="h5" component="h3" pt={1}>
                {children}
            </Typography>
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

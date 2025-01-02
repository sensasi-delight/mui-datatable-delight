import type { MDXComponents } from 'mdx/types'
import { Alert, Link, Typography } from '@mui/material'
import { CodeSnippet, InlineCode } from './components'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        pre: props => {
            const lang = props.children.props.className.replace('language-', '')

            return (
                <CodeSnippet
                    language={lang}
                    text={props.children.props.children}
                />
            )
        },
        code: ({ children }) => <InlineCode text={children} />,
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

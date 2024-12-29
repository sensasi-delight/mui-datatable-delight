import type { MDXComponents } from 'mdx/types'
import { CodeSnippet } from './components/code-snippet'
import { Link, Typography } from '@mui/material'

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
        code: props => (
            <Typography
                component="code"
                fontWeight="inherit"
                fontFamily="monospace"
                {...props}
            />
        ),
        a: props => <Link {...props} />,
        ...components
    }
}

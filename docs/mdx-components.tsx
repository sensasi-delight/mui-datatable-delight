import type { MDXComponents } from 'mdx/types'
import { Link } from '@mui/material'
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
        a: props => <Link {...props} />,
        ...components
    }
}

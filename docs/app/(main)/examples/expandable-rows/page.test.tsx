import { render } from '@testing-library/react'
import { expect, test } from 'vitest'
import Page from './page'

test('should render Page', () => {
    const { container } = render(<Page />)

    expect(container.hasChildNodes()).toBeTruthy()
})

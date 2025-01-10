import { test, expect } from 'vitest'
import { render } from '@testing-library/react'
import Page from './page'

test('should render Page', () => {
    const { container } = render(<Page />)

    expect(container.hasChildNodes()).toBeTruthy()
})
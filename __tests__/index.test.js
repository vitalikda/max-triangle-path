import { render, screen } from '@testing-library/react'
import Home from '../src/app/page'
import '@testing-library/jest-dom'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const button = screen.getByRole('button', {
      name: /submit/i,
    })

    expect(button).toBeInTheDocument()
  })
})

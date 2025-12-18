jest.mock('./config/env', () => ({
  env: {
    githubApiUrl: 'https://api.github.com',
    githubToken: 'test-token',
  },
}))

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  it('renders application title', () => {
    render(<App />)

    expect(
      screen.getByText(/Explore repositórios no GitHub/i),
    ).toBeInTheDocument()
  })

  it('shows empty state before search', () => {
    render(<App />)

    expect(
      screen.getByText(/Digite um termo e clique em buscar/i),
    ).toBeInTheDocument()
  })

  it('disables search button when input is empty', () => {
    render(<App />)

    const button = screen.getByRole('button', { name: /buscar/i })
    expect(button).toBeDisabled()
  })

  it('enables search button when user types', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText(/Pesquisar repositórios/i)
    const button = screen.getByRole('button', { name: /buscar/i })

    await user.type(input, 'react')

    expect(button).toBeEnabled()
  })
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('renders the button with text', () => {
    render(<Button>Click me</Button>)

    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('calls onClick when clicked', async () => {
    const onClick = jest.fn()

    render(<Button onClick={onClick}>Click</Button>)

    await userEvent.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>)

    expect(screen.getByRole('button')).toBeDisabled()
  })
})

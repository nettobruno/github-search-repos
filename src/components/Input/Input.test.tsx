import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'
import { Search } from 'lucide-react'

describe('Input', () => {
  it('should update value when typing', async () => {
    const user = userEvent.setup()
    render(<Input />)

    const input = screen.getByRole('textbox')
    await user.type(input, 'my-user')

    expect(input).toHaveValue('my-user')
  })

  it('should be disabled when the disabled prop is passed', () => {
    render(<Input disabled />)

    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
  })

  it('should render the icon when provided', () => {
    const { container } = render(<Input icon={Search} />)
    const icon = container.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })
})

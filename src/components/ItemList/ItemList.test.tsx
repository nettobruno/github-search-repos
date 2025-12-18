import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ItemList } from './ItemList'

describe('ItemList', () => {
  const defaultProps = {
    image: 'https://avatars.githubusercontent.com/u/9892522?v=4',
    title: 'Test Repository',
    fullName: 'freeCodeCamp/freeCodeCamp',
    language: 'TypeScript',
    stars: 100,
    onClick: jest.fn(),
  }

  it('renders item list with basic information', () => {
    render(<ItemList {...defaultProps} />)

    expect(screen.getByText('Test Repository')).toBeInTheDocument()
    expect(screen.getByText('freeCodeCamp/freeCodeCamp')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
  })

  it('renders image with correct src and alt text', () => {
    render(<ItemList {...defaultProps} />)

    const image = screen.getByAltText('Test Repository')
    expect(image).toHaveAttribute(
      'src',
      'https://avatars.githubusercontent.com/u/9892522?v=4',
    )
  })

  it('calls onClick when clicked', async () => {
    const onClick = jest.fn()
    const user = userEvent.setup()

    render(<ItemList {...defaultProps} onClick={onClick} />)

    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('displays fallback text when language is empty', () => {
    render(<ItemList {...defaultProps} language="" />)

    expect(screen.getByText('Não especificada')).toBeInTheDocument()
  })
})

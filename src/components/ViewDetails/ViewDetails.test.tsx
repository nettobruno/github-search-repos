import { render, screen } from '@testing-library/react'
import { ViewDetails } from './ViewDetails'

describe('ViewDetails', () => {
  const defaultProps = {
    image: 'https://example.com/image.jpg',
    title: 'Test Repository',
    fullName: 'test-user/test-repo',
    description: 'This is a detailed description of the test repository.',
    language: 'TypeScript',
    stars: 150,
    forks: 50,
    lastUpdate: '2025-12-17T10:00:00Z',
    repositoryUrl: 'https://github.com/test/repo',
  }

  it('renders repository basic information', () => {
    render(<ViewDetails {...defaultProps} />)

    expect(screen.getByText('Test Repository')).toBeInTheDocument()
    expect(screen.getByText('test-user/test-repo')).toBeInTheDocument()
    expect(
      screen.getByText(
        'This is a detailed description of the test repository.',
      ),
    ).toBeInTheDocument()
  })

  it('renders repository image with correct alt and src', () => {
    render(<ViewDetails {...defaultProps} />)

    const image = screen.getByAltText('Test Repository')
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg')
  })

  it('renders stars and forks values', () => {
    render(<ViewDetails {...defaultProps} />)

    expect(screen.getByText('150')).toBeInTheDocument()
    expect(screen.getByText('50')).toBeInTheDocument()
  })

  it('renders formatted last update date', () => {
    render(<ViewDetails {...defaultProps} />)

    expect(screen.getByText('17/12/2025')).toBeInTheDocument()
  })

  it('displays fallback text when language is not provided', () => {
    render(<ViewDetails {...defaultProps} language="" />)

    expect(screen.getByText('Não especificada')).toBeInTheDocument()
  })

  it('renders link to repository with correct attributes', () => {
    render(<ViewDetails {...defaultProps} />)

    const link = screen.getByRole('link', {
      name: /abrir repositório/i,
    })

    expect(link).toHaveAttribute('href', 'https://github.com/test/repo')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})

import { renderHook, act } from '@testing-library/react'
import { useMediaQuery } from './useMediaQuery'

describe('useMediaQuery', () => {
  it('returns true when the media query matches', () => {
    ;(window.matchMedia as jest.Mock).mockImplementationOnce(
      (query: string) => ({
        matches: true,
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }),
    )

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(true)
  })

  it('updates state when the media query change event is triggered', () => {
    let listener: (e: { matches: boolean }) => void = () => {}

    ;(window.matchMedia as jest.Mock).mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: jest.fn((event, callback) => {
        if (event === 'change') listener = callback
      }),
      removeEventListener: jest.fn(),
    }))

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))

    act(() => {
      listener({ matches: true })
    })

    expect(result.current).toBe(true)
  })
})

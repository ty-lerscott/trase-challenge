import { render, screen, fireEvent } from '@testing-library/react'

const onSearch = vi.fn();

vi.mock('../hooks/use-search-context', () => ({
    useSearch: vi.fn(() => ({
        searchString: 'test',
        onSearch,
    })), 
}))

import Search from './search'

describe('Search', () => {
  it('should render as expected', () => {
    render(<Search />)
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveValue('test')
  })

  it('should call onSearch when the input is changed',async () => {
    render(<Search />)
    const input = screen.getByRole('textbox')
    await fireEvent.change(input, { target: { value: 'test2' } })

    expect(onSearch).toHaveBeenCalledWith('test2')
  })

  afterAll(() => {
    vi.clearAllMocks();
  })
})
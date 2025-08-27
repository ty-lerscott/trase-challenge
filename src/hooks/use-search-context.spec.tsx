import { SearchProvider, useSearch } from './use-search-context' // adjust path
import { render, screen, renderHook, act } from '@testing-library/react'

// A tiny consumer to assert rendered output
function Consumer() {
  const { searchString } = useSearch()
  return <div data-testid="value">{searchString}</div>
}

describe('SearchProvider / useSearch', () => {
  it('throws if used outside of provider', () => {
    // @ts-ignore
    expect(() => renderHook(() => useSearch())).toThrowError(
      'useSearch must be used inside SearchProvider'
    )
  })

  it('provides the default value to consumers', () => {
    render(
      <SearchProvider>
        <Consumer />
      </SearchProvider>
    )
    expect(screen.getByTestId('value')).toHaveTextContent('') // default is ""
  })

  it('updates value when onSearch is called (via renderHook)', () => {
    // render the hook *inside* the provider using the wrapper pattern
    const wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
      <SearchProvider>{children}</SearchProvider>
    )

    const { result } = renderHook(() => useSearch(), { wrapper })

    // call the updater and assert the state changed
    act(() => {
      result.current.onSearch('query')
    })

    expect(result.current.searchString).toBe('query')
  })

  it('re-renders consuming components when the value changes', () => {
    const updateButton = 'update';
    const updatedString = 'updated';
    function Updater() {
      const { onSearch } = useSearch()
      return (
        <button onClick={() => onSearch(updatedString)} aria-label={updateButton}>
          Update
        </button>
      )
    }

    const {rerender} = render(
      <SearchProvider>
        <Updater />
        <Consumer />
      </SearchProvider>
    )
    act(() => {
        screen.getByLabelText(updateButton).click()
    })

    rerender(
        <SearchProvider>
            <Updater />
            <Consumer />
        </SearchProvider>
    );

    expect(screen.getByTestId('value')).toHaveTextContent(updatedString)
  })
})

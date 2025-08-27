import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import useProducts from './use-products'

type Product = { id: number; title: string }

const MOCK_PRODUCTS: Product[] = [
  { id: 1, title: 'Mock Hat' },
  { id: 2, title: 'Mock Shoes' },
]

// helper to create a fresh client per test (no cache bleed)
const createTestClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })

describe('useProducts', () => {
  const originalFetch = global.fetch

  beforeEach(() => {
    vi.restoreAllMocks()
  })

  afterEach(() => {
    global.fetch = originalFetch
  })

  it('returns data from the mocked fetch', async () => {
    // 1) mock fetch to resolve with our payload
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => MOCK_PRODUCTS,
    } as unknown as Response)

    const qc = createTestClient()

    const wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
      <QueryClientProvider client={qc}>{children}</QueryClientProvider>
    )

    const { result } = renderHook(() => useProducts(), { wrapper })

    // initial state
    expect(result.current.isLoading).toBe(true)

    // wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual(MOCK_PRODUCTS)
    // also check fetch was called with the right URL
    expect(global.fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products')
  })
})

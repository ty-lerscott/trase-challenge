import { injectGlobal, css } from '@emotion/css'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Search from '../components/search'
import { SearchProvider } from '../hooks/use-search-context'

injectGlobal`
  :root {
    --color-white: #FFFFFF;
    --color-gray-50: #F5F5F5;
    --color-gray-100: #737373;
    --color-secondary: #FCA311;
    --color-primary: #14213D;
    --color-black: #000000;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: "Noto Sans", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    font-variation-settings: "wdth" 100;
    min-height: 100vh;
    color: var(--color-primary);
  }
  p {
    margin: 0;
  }
`

export const Route = createRootRoute({
  component: () => (
    <SearchProvider>
      <div className={css`
        padding: 0.5rem 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      `}>
        <Link to="/" className={css`
          text-decoration: none;
          color: inherit;
          font-weight: 600;
          text-transform: uppercase;
          transition: color 0.1s ease-in-out;
          &:hover {
            color: var(--color-secondary);
          }
        `}>
          Trase Challenge
        </Link>
        <Search />
      </div>
      <hr className={css`
        margin: 0;
      `}/>
      <Outlet />
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </SearchProvider>
  ),
})
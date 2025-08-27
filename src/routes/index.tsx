import { css } from '@emotion/css'
import { useMemo, useState } from 'react'
import {matchSorter} from 'match-sorter'
import { createFileRoute } from '@tanstack/react-router'
import type { Product as ProductType } from '../types/product'
import Product from '../components/product'

import useProducts from '../hooks/use-products'
import { useSearch } from '../hooks/use-search-context'

function Index() {
  const [isAscending, setIsAscending] = useState(true);
  const { data, isLoading, error } = useProducts();
  const { searchString } = useSearch();

  const filteredProducts = useMemo(() => {
    return matchSorter(
      (data || []) as ProductType[],
      searchString, {
        keys: ['title', 'description'],
        sorter: rankedProducts => rankedProducts.toSorted((a, b) => {
          if (isAscending) {
            return a.item.price - b.item.price;
          }
          return b.item.price - a.item.price;
        })
      });
  }, [searchString, data, isAscending])

  const handleToggleOrder = () => setIsAscending(prevState => !prevState);

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>Error: {error.message}</div>

  return (
    <div className={css`
      display: flex;
      flex-direction: column;
      gap: 1rem;
    `}>
      <div className={css`
        padding: 1rem;
        align-self: flex-end;
      `}>
        Sort by price:{' '}
        <button onClick={handleToggleOrder} className={css`font-weight: bold; cursor: pointer;`}>
          {isAscending ? 'Ascending' : 'Descending'}
        </button>
      </div>
      <div className={css`
        display: grid;
        grid-template-columns: repeat(3, minmax(200px, 1fr));
        gap: 1rem;
        padding: 1rem;

        @media (max-width: 768px) {
          grid-template-columns: repeat(2, minmax(200px, 1fr));
        }

        @media (max-width: 480px) {
          grid-template-columns: repeat(1, minmax(200px, 1fr));
        }
      `}>
        {filteredProducts ? filteredProducts.map(product => {
          return <Product product={product} key={product.id} />
        }) : <div>No products found</div>}
      </div>
      <div className={css`
        padding: 1rem;
        text-align: center;
        background-color: var(--color-gray-50);
        color: var(--color-primary);
      `}>
        {filteredProducts ? filteredProducts.length : 0} products found, {filteredProducts ? `averaging: $${(filteredProducts.reduce((acc, product) => acc + product.price, 0) / filteredProducts.length).toFixed(2)}` : ''}
      </div>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Index,
})

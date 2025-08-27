import { css } from '@emotion/css'
import type { Product as ProductType } from '../types/product'

const Product = ({ product }: { product: ProductType }) => {
    return (
        <div className={css`
            margin: 0;
            padding: 0.5rem;
          `}>
            <div className={css`
              height: 300px;
              padding: 1rem;
              margin-bottom: 0.5rem;
              background-color: var(--color-gray-50);
              border-radius: 0.5rem;
              display: flex;
              justify-content: center;
              align-items: center;
            `}>
              <img
                className={css`
                  height: 100%;
                  max-width: 100%;
                  object-fit: contain;
                `}
                src={product.image}
                alt={product.title} />
              </div>
            <p className={css`
              font-size: 0.8rem;
              font-weight: bold;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              color: var(--color-primary);
            `}>{product.title}</p>
            <p className={css`
              font-size: 0.75rem;
              color: var(--color-gray-100);
              line-height: 1.2;
              margin: 0.5rem 0;
            `}>{product.description}</p>
            <p className={css`
              font-size: 0.75rem;
              font-weight: bold;
              color: var(--color-primary);
            `}>{`$${product.price}`}</p>
        </div>
    )
}

export default Product;
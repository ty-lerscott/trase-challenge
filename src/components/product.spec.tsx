import { render, screen } from '@testing-library/react'
import Product from './product'

const product = {
    id: 1,
    title: 'Product 1',
    description: 'Product 1 description',
    price: 100,
    image: 'https://via.placeholder.com/150',
    category: 'Category 1',
    rating: {
      rate: 5,
      count: 100,
    },
  }

describe('Product', () => {
  it('should render as expected', () => {
    render(<Product product={product} />)
    expect(screen.getByText(product.title)).toBeInTheDocument()
    expect(screen.getByText(product.description)).toBeInTheDocument()
    expect(screen.getByText(`$${product.price}`)).toBeInTheDocument()
  })
})
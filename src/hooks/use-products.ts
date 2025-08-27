import { useQuery } from '@tanstack/react-query'
import type { Product as ProductType } from '../types/product'

const useProducts = () => {
    return useQuery<ProductType[]>({
        queryKey: ['products'],
        queryFn: () => fetch('https://fakestoreapi.com/products').then(res => res.json()),
    })
}

export default useProducts;
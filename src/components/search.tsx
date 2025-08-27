import { css } from '@emotion/css'
import { useSearch } from '../hooks/use-search-context'

const Search = () => {
    const { searchString, onSearch } = useSearch();

    return (
        <div className={css`
            display: flex;
            justify-content: center;
            align-items: center;
        `}>
            <input name="search" type="text" placeholder="Search" className={css`
                padding: 0.5rem 1rem;
                border: 1px solid var(--color-gray-100);
                border-radius: 8rem;
                width: 100%;
            `}
            value={searchString}
            onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    )
}

export default Search;
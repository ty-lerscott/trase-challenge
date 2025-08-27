import { createContext, useContext, useState, type ReactNode } from "react";

type SearchContextType = {
  searchString: string;
  onSearch: (string: string) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
    const [searchString, setSearchString] = useState("");
  
    return (
      <SearchContext.Provider value={{ searchString, onSearch: setSearchString }}>
        {children}
      </SearchContext.Provider>
    );
}

export function useSearch() {
    const ctx = useContext(SearchContext);
    if (!ctx) throw new Error("useSearch must be used inside SearchProvider");
    return ctx;
}
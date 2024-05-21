import { useState, useEffect } from "react";

export const useDebounce = (search, delay=1000) => {
    const[debouncedSearchTerm, setDebouncedSearchTerm] = useState(search);

    useEffect(() => {
    const timer = setTimeout(() => {
        setDebouncedSearchTerm(search)

    }, delay);
    return () => {
        clearTimeout(timer);
    };
}, [search, delay])

    return debouncedSearchTerm;
}
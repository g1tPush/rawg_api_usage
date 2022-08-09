import React from 'react'
import { SearchIcon } from '@heroicons/react/solid'
import { useState, useEffect } from 'react'
import { search } from '../../features/orginizer/counterSlice'
import { useAppDispatch } from '../../app/hooks'
import { useDebounce } from '../../hooks/useDebounce'

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [results, setResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState<boolean>(false);

    const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 500);
    const dispatch = useAppDispatch()

    useEffect(() => {
        setIsSearching(true);
        dispatch(search(searchTerm))
        setIsSearching(false)
        setResults(results)
    }, [debouncedSearchTerm])

    return (
        <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
            <div className="flex items-center md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                <div className="w-full">
                    <label htmlFor="search" className="sr-only">
                        Search
                    </label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                            <SearchIcon className="h-5 w-5 text-white" aria-hidden="true" />
                        </div>
                        <input
                            style={{ color: 'white' }}
                            id="search"
                            name="search"
                            className="block placeholder:text-white w-full bg-black rounded-md py-2 pl-10 pr-3 text-sm focus:outline-none focus:text-white focus:placeholder-white focus:ring-1 focus:ring-zing-500 focus:border-zing-500 sm:text-sm"
                            placeholder="Search"
                            type="search"
                            value={searchTerm}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchBar
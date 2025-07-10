'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Search() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    // Initialize search term from URL params
    useEffect(() => {
        const query = searchParams.get('query');
        if (query) {
            setSearchTerm(query);
        }
    }, [searchParams]);

    function handleSearch(term) {
        setSearchTerm(term);
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }

        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className='g-px'>
            <input
                type="search"
                placeholder="Search articles..."
                className="peer block w-full max-w-[60%] mx-auto bg-black mb-12 rounded-md border border-gray-200 py-[9px] px-3 text-sm outline-2 placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                value={searchTerm}
                aria-label="Search articles"
            />
        </div>
    );
}

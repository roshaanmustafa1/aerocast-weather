import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchFormProps {
    onSearch: (city: string) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
    const [city, setCity] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city);
            setCity('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full relative">
            <div className="flex items-center  focus-within:border-foreground/80 transition-colors pb-1">
                <input 
                    type="text" 
                    placeholder="Search for a city..." 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-transparent text-foreground placeholder-muted-foreground/70 outline-none text-base "
                />
                <button type="submit" aria-label="Search" className="ml-2">
                    <Search className="text-muted-foreground/80 hover:text-foreground transition-colors w-5 h-5 cursor-pointer" />
                </button>
            </div>
        </form>
    );
}

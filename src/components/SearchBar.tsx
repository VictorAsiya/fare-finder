
import React, { useState } from 'react';
import { MapPin, ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { popularDestinations } from '@/data/fakeData';

interface SearchBarProps {
  onSearch: (params: SearchParams) => void;
}

export interface SearchParams {
  from: string;
  to: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  const handleSearch = () => {
    onSearch({ from, to });
  };

  return (
    <div className="search-container p-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <div className="flex items-center border rounded-md p-2 focus-within:ring-2 focus-within:ring-primary">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="From"
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              onFocus={() => setShowFromSuggestions(true)}
              onBlur={() => setTimeout(() => setShowFromSuggestions(false), 200)}
            />
          </div>
          {showFromSuggestions && (
            <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10 py-1 max-h-60 overflow-auto">
              {popularDestinations
                .filter((city) => 
                  city.name.toLowerCase().includes(from.toLowerCase()) || 
                  city.code.toLowerCase().includes(from.toLowerCase())
                )
                .map((city) => (
                  <div
                    key={city.code}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setFrom(city.name);
                      setShowFromSuggestions(false);
                    }}
                  >
                    <div className="font-medium">{city.name}</div>
                    <div className="text-sm text-gray-500">{city.code}</div>
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="relative">
          <div className="flex items-center border rounded-md p-2 focus-within:ring-2 focus-within:ring-primary">
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="To"
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              onFocus={() => setShowToSuggestions(true)}
              onBlur={() => setTimeout(() => setShowToSuggestions(false), 200)}
            />
          </div>
          {showToSuggestions && (
            <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10 py-1 max-h-60 overflow-auto">
              {popularDestinations
                .filter((city) => 
                  city.name.toLowerCase().includes(to.toLowerCase()) || 
                  city.code.toLowerCase().includes(to.toLowerCase())
                )
                .map((city) => (
                  <div
                    key={city.code}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setTo(city.name);
                      setShowToSuggestions(false);
                    }}
                  >
                    <div className="font-medium">{city.name}</div>
                    <div className="text-sm text-gray-500">{city.code}</div>
                  </div>
                ))}
            </div>
          )}
        </div>

        <Button 
          onClick={handleSearch} 
          className="bg-primary hover:bg-primary/90 text-white py-2"
        >
          <Search className="mr-2 h-4 w-4" />
          Find Fares
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;

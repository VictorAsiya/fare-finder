
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
    <div className="search-container p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        <div className="relative md:col-span-3">
          <div className="flex items-center border border-border/60 rounded-md p-2 focus-within:ring-1 focus-within:ring-primary/30 focus-within:border-primary/30 bg-background transition-all">
            <MapPin className="h-4 w-4 text-muted-foreground mx-2" />
            <Input
              type="text"
              placeholder="From"
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              onFocus={() => setShowFromSuggestions(true)}
              onBlur={() => setTimeout(() => setShowFromSuggestions(false), 200)}
            />
          </div>
          {showFromSuggestions && from.length > 0 && (
            <div className="absolute mt-1 w-full rounded-md bg-card border border-border/60 shadow-sm z-10 py-1 max-h-60 overflow-auto">
              {popularDestinations
                .filter((city) => 
                  city.name.toLowerCase().includes(from.toLowerCase()) || 
                  city.code.toLowerCase().includes(from.toLowerCase())
                )
                .map((city) => (
                  <div
                    key={city.code}
                    className="px-4 py-2 hover:bg-secondary cursor-pointer"
                    onClick={() => {
                      setFrom(city.name);
                      setShowFromSuggestions(false);
                    }}
                  >
                    <div className="font-medium text-sm">{city.name}</div>
                    <div className="text-xs text-muted-foreground">{city.code}</div>
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center justify-center">
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
        </div>

        <div className="relative md:col-span-3">
          <div className="flex items-center border border-border/60 rounded-md p-2 focus-within:ring-1 focus-within:ring-primary/30 focus-within:border-primary/30 bg-background transition-all">
            <MapPin className="h-4 w-4 text-muted-foreground mx-2" />
            <Input
              type="text"
              placeholder="To"
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              onFocus={() => setShowToSuggestions(true)}
              onBlur={() => setTimeout(() => setShowToSuggestions(false), 200)}
            />
          </div>
          {showToSuggestions && to.length > 0 && (
            <div className="absolute mt-1 w-full rounded-md bg-card border border-border/60 shadow-sm z-10 py-1 max-h-60 overflow-auto">
              {popularDestinations
                .filter((city) => 
                  city.name.toLowerCase().includes(to.toLowerCase()) || 
                  city.code.toLowerCase().includes(to.toLowerCase())
                )
                .map((city) => (
                  <div
                    key={city.code}
                    className="px-4 py-2 hover:bg-secondary cursor-pointer"
                    onClick={() => {
                      setTo(city.name);
                      setShowToSuggestions(false);
                    }}
                  >
                    <div className="font-medium text-sm">{city.name}</div>
                    <div className="text-xs text-muted-foreground">{city.code}</div>
                  </div>
                ))}
            </div>
          )}
        </div>

        <Button 
          onClick={handleSearch} 
          className="md:col-span-1"
        >
          <Search className="h-4 w-4 mr-2" />
          Find
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;


import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import SearchBar, { SearchParams } from '@/components/SearchBar';
import FareCard from '@/components/FareCard';
import ComparisonChart from '@/components/ComparisonChart';
import MobileFilters from '@/components/MobileFilters';
import ReportModal from '@/components/ReportModal';
import { transportFares, fakeHistoricalPrices, FareData } from '@/data/fakeData';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [fares, setFares] = useState<FareData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('price');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [reportFareId, setReportFareId] = useState<string | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulating API fetch delay
    const timer = setTimeout(() => {
      setFares(transportFares);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (params: SearchParams) => {
    setIsLoading(true);
    
    // Simulate search with a delay
    setTimeout(() => {
      let filteredFares = [...transportFares];
      
      // Filter by route if specified
      if (params.from && params.to) {
        filteredFares = filteredFares.filter(
          fare => 
            fare.route.from.toLowerCase().includes(params.from.toLowerCase()) && 
            fare.route.to.toLowerCase().includes(params.to.toLowerCase())
        );
      } else if (params.from) {
        filteredFares = filteredFares.filter(
          fare => fare.route.from.toLowerCase().includes(params.from.toLowerCase())
        );
      } else if (params.to) {
        filteredFares = filteredFares.filter(
          fare => fare.route.to.toLowerCase().includes(params.to.toLowerCase())
        );
      }

      // In a real app, we'd also filter by date

      setFares(filteredFares);
      setIsLoading(false);

      toast({
        title: "Search completed",
        description: `Found ${filteredFares.length} transport options`,
      });
    }, 1000);
  };

  const handleSort = (criteria: string) => {
    if (sortBy === criteria) {
      // Toggle direction if already sorting by this criteria
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New criteria, default to ascending
      setSortBy(criteria);
      setSortDirection('asc');
    }

    // Sort the fares
    const sortedFares = [...fares].sort((a, b) => {
      let valueA, valueB;

      switch (criteria) {
        case 'price':
          valueA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
          valueB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
          break;
        case 'duration':
          valueA = parseInt(a.duration.split('h')[0]) * 60 + parseInt(a.duration.split('h')[1].split('m')[0]);
          valueB = parseInt(b.duration.split('h')[0]) * 60 + parseInt(b.duration.split('h')[1].split('m')[0]);
          break;
        case 'rating':
          valueA = a.rating;
          valueB = b.rating;
          break;
        default:
          valueA = a.price;
          valueB = b.price;
      }

      if (sortDirection === 'asc') {
        return valueA - valueB;
      } else {
        return valueB - valueA;
      }
    });

    setFares(sortedFares);
  };

  const handleFilter = (filters: any) => {
    setIsLoading(true);
    
    // Simulate filtering with a delay
    setTimeout(() => {
      let filteredFares = [...transportFares];
      
      // Filter by price range
      if (filters.priceRange) {
        filteredFares = filteredFares.filter(
          fare => {
            const actualPrice = fare.discount 
              ? fare.price * (1 - fare.discount / 100) 
              : fare.price;
            return actualPrice >= filters.priceRange[0] && actualPrice <= filters.priceRange[1];
          }
        );
      }
      
      // Filter by transport types
      if (filters.transportTypes && filters.transportTypes.length > 0) {
        filteredFares = filteredFares.filter(
          fare => filters.transportTypes.includes(fare.transportType)
        );
      }
      
      // Filter by companies
      if (filters.companies && filters.companies.length > 0) {
        filteredFares = filteredFares.filter(
          fare => {
            const companyId = fare.company.toLowerCase().replace(' ', '-');
            return filters.companies.includes(companyId);
          }
        );
      }
      
      setFares(filteredFares);
      setIsLoading(false);
    }, 800);
  };

  const handleReportIssue = (fareId: string) => {
    setReportFareId(fareId);
    setShowReportModal(true);
  };

  const closeReportModal = () => {
    setShowReportModal(false);
    setReportFareId(null);
  };

  return (
    <div>
      {/* Search Section */}
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h2 className="text-xl font-semibold mb-4 sm:mb-0">Available Options</h2>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                <div className="hidden sm:flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleSort('price')}
                    className={sortBy === 'price' ? 'bg-muted' : ''}
                  >
                    Price
                    {sortBy === 'price' && (
                      sortDirection === 'asc' ? 
                        <ArrowUp className="h-3 w-3 ml-1" /> : 
                        <ArrowDown className="h-3 w-3 ml-1" />
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleSort('duration')}
                    className={sortBy === 'duration' ? 'bg-muted' : ''}
                  >
                    Duration
                    {sortBy === 'duration' && (
                      sortDirection === 'asc' ? 
                        <ArrowUp className="h-3 w-3 ml-1" /> : 
                        <ArrowDown className="h-3 w-3 ml-1" />
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleSort('rating')}
                    className={sortBy === 'rating' ? 'bg-muted' : ''}
                  >
                    Rating
                    {sortBy === 'rating' && (
                      sortDirection === 'asc' ? 
                        <ArrowUp className="h-3 w-3 ml-1" /> : 
                        <ArrowDown className="h-3 w-3 ml-1" />
                    )}
                  </Button>
                </div>
                <div className="block sm:hidden w-full">
                  <select 
                    className="w-full rounded-md border border-input px-3 py-2 text-sm"
                    value={sortBy}
                    onChange={(e) => handleSort(e.target.value)}
                  >
                    <option value="price">Sort by Price</option>
                    <option value="duration">Sort by Duration</option>
                    <option value="rating">Sort by Rating</option>
                  </select>
                </div>
                <div className="block sm:hidden w-full">
                  <MobileFilters onFilterChange={handleFilter} />
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-48 bg-gray-100 animate-pulse rounded-md"></div>
                ))}
              </div>
            ) : fares.length > 0 ? (
              <div className="space-y-4">
                {fares.map((fare) => (
                  <FareCard 
                    key={fare.id} 
                    fare={fare} 
                    onReportIssue={handleReportIssue} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <h3 className="text-lg font-medium">No results found</h3>
                <p className="text-muted-foreground mt-2">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="hidden lg:block mb-6">
            <MobileFilters onFilterChange={handleFilter} />
          </div>
          
          <ComparisonChart 
            data={fakeHistoricalPrices}
            title="Fare Price Trends"
            description="7-day price history for popular routes"
          />
          
          <div className="bg-white rounded-lg shadow p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Travel Tips</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <span className="bg-blue-100 text-primary p-1 rounded mr-2 mt-0.5">•</span>
                <span>Book midweek for the best prices on most routes</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-primary p-1 rounded mr-2 mt-0.5">•</span>
                <span>Compare different transport types for the same route</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-primary p-1 rounded mr-2 mt-0.5">•</span>
                <span>Check for seasonal promotions and discounts</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-primary p-1 rounded mr-2 mt-0.5">•</span>
                <span>Some companies offer loyalty programs with significant savings</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      <ReportModal 
        isOpen={showReportModal} 
        fareId={reportFareId} 
        onClose={closeReportModal} 
      />
    </div>
  );
};

export default Index;

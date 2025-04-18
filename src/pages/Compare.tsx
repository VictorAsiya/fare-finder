
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { transportFares, FareData } from '@/data/fakeData';
import ComparisonChart from '@/components/ComparisonChart';

const Compare = () => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [comparisonData, setComparisonData] = useState<Record<string, number[]>>({});
  const [availableCompanies, setAvailableCompanies] = useState<string[]>([]);
  const { toast } = useToast();

  // Perform search and update available companies
  const handleSearch = () => {
    if (!fromLocation || !toLocation) {
      toast({
        title: "Incomplete search",
        description: "Please enter both 'From' and 'To' locations",
        variant: "destructive",
      });
      return;
    }

    // Filter fares based on route
    const filteredFares = transportFares.filter(
      fare => 
        fare.route.from.toLowerCase().includes(fromLocation.toLowerCase()) && 
        fare.route.to.toLowerCase().includes(toLocation.toLowerCase())
    );

    if (filteredFares.length === 0) {
      toast({
        title: "No routes found",
        description: "No companies offer this route. Try a different search.",
      });
      return;
    }

    // Extract unique companies
    const companies = [...new Set(filteredFares.map(fare => fare.company))];
    setAvailableCompanies(companies);
    
    toast({
      title: "Search completed",
      description: `${companies.length} companies found for this route`,
    });
  };

  // Handle company selection/deselection
  const toggleCompany = (company: string) => {
    if (selectedCompanies.includes(company)) {
      setSelectedCompanies(selectedCompanies.filter(c => c !== company));
    } else {
      if (selectedCompanies.length < 3) {
        setSelectedCompanies([...selectedCompanies, company]);
      } else {
        toast({
          title: "Maximum selection reached",
          description: "You can compare up to 3 companies at once",
        });
      }
    }
  };

  // Generate comparison data for selected companies
  const compareCompanies = () => {
    if (selectedCompanies.length < 2) {
      toast({
        title: "Select more companies",
        description: "Please select at least 2 companies to compare",
      });
      return;
    }

    // In a real app, this would fetch historical price data from an API
    // For now, let's create some sample data
    const comparisonResult: Record<string, number[]> = {};
    
    selectedCompanies.forEach(company => {
      // Generate last 7 days of prices with slight variations
      const baseFare = transportFares.find(fare => 
        fare.company === company && 
        fare.route.from.toLowerCase().includes(fromLocation.toLowerCase()) && 
        fare.route.to.toLowerCase().includes(toLocation.toLowerCase())
      )?.price || 50;
      
      comparisonResult[company] = Array.from({ length: 7 }, (_, i) => {
        // Create a pattern with slight variations (±15%)
        const variation = (Math.random() * 0.3) - 0.15;
        return Number((baseFare * (1 + variation)).toFixed(2));
      });
    });
    
    setComparisonData(comparisonResult);
    
    toast({
      title: "Comparison generated",
      description: "Comparing prices for the selected companies",
    });
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Compare Fare Prices</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search Route</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="from">From</Label>
              <Input
                id="from"
                placeholder="e.g. New York"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
              />
            </div>
            <div className="flex items-end justify-center">
              <ArrowRight className="mb-3" />
            </div>
            <div>
              <Label htmlFor="to">To</Label>
              <Input
                id="to"
                placeholder="e.g. Boston"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
              />
            </div>
          </div>
          <Button className="mt-4" onClick={handleSearch}>
            Search Routes
          </Button>
        </CardContent>
      </Card>

      {availableCompanies.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Select Companies to Compare</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {availableCompanies.map((company) => (
                <div key={company} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`company-${company}`}
                    checked={selectedCompanies.includes(company)}
                    onChange={() => toggleCompany(company)}
                    className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor={`company-${company}`}>{company}</Label>
                </div>
              ))}
            </div>
            <Button 
              className="mt-4" 
              onClick={compareCompanies}
              disabled={selectedCompanies.length < 2}
            >
              Compare Prices
            </Button>
          </CardContent>
        </Card>
      )}

      {Object.keys(comparisonData).length > 0 && (
        <ComparisonChart 
          data={comparisonData}
          title="7-Day Price Comparison"
          description={`Comparing prices from ${fromLocation} to ${toLocation}`}
        />
      )}
    </div>
  );
};

export default Compare;

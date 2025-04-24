
import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { transportCompanies } from '@/data/fakeData';

interface FilterValues {
  priceRange: [number, number];
  transportTypes: string[];
  companies: string[];
  showDirectOnly: boolean;
}

interface MobileFiltersProps {
  onFilterChange: (filters: FilterValues) => void;
}

const MobileFilters: React.FC<MobileFiltersProps> = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [transportTypes, setTransportTypes] = useState<string[]>(['bus', 'train', 'ferry', 'flight']);
  const [companies, setCompanies] = useState<string[]>([]);
  const [directOnly, setDirectOnly] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleApplyFilters = () => {
    onFilterChange({
      priceRange,
      transportTypes,
      companies,
      showDirectOnly: directOnly
    });
    setIsOpen(false);
  };

  const toggleTransportType = (type: string) => {
    if (transportTypes.includes(type)) {
      setTransportTypes(transportTypes.filter(t => t !== type));
    } else {
      setTransportTypes([...transportTypes, type]);
    }
  };

  const toggleCompany = (id: string) => {
    if (companies.includes(id)) {
      setCompanies(companies.filter(c => c !== id));
    } else {
      setCompanies([...companies, id]);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Filter Options</SheetTitle>
          <SheetDescription>
            Adjust your search criteria to find the perfect transport option.
          </SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Price Range</h3>
            <div className="pt-4">
              <Slider
                defaultValue={[0, 200]}
                max={500}
                step={5}
                onValueChange={(value) => setPriceRange(value as [number, number])}
              />
              <div className="flex justify-between mt-2">
                <span className="text-sm">${priceRange[0]}</span>
                <span className="text-sm">${priceRange[1]}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Transport Type</h3>
            <div className="grid grid-cols-2 gap-2">
              {['bus', 'train', 'ferry', 'flight'].map(type => (
                <Button
                  key={type}
                  variant={transportTypes.includes(type) ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => toggleTransportType(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Transport Companies</h3>
            <div className="space-y-2">
              {transportCompanies.map(company => (
                <div key={company.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={company.id}
                    checked={companies.includes(company.id)}
                    onChange={() => toggleCompany(company.id)}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <Label htmlFor={company.id}>{company.name}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="direct-only"
              checked={directOnly}
              onCheckedChange={setDirectOnly}
            />
            <Label htmlFor="direct-only">Direct routes only</Label>
          </div>

          <Button onClick={handleApplyFilters} className="w-full">
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilters;

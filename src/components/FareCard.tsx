
import React from 'react';
import { Star, Clock, AlertCircle, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FareData } from '../data/fakeData';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface FareCardProps {
  fare: FareData;
  onReportIssue: (fareId: string) => void;
}

const transportIcons: Record<string, React.ReactElement> = {
  'bus': <Truck className="h-4 w-4" />,
  'train': <Truck className="h-4 w-4" />,
  'ferry': <Truck className="h-4 w-4" />,
  'flight': <Truck className="h-4 w-4" />,
};

const FareCard: React.FC<FareCardProps> = ({ fare, onReportIssue }) => {
  return (
    <div className="fare-card rounded-lg border bg-card text-card-foreground shadow">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center mr-4">
              {transportIcons[fare.transportType] || <Truck className="h-6 w-6" />}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{fare.company}</h3>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="ml-1 text-sm">{fare.rating}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end">
              {fare.discount ? (
                <>
                  <span className="text-sm line-through text-gray-500 mr-2">
                    ${fare.price.toFixed(2)}
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    ${(fare.price * (1 - fare.discount / 100)).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold">
                  ${fare.price.toFixed(2)}
                </span>
              )}
            </div>
            {fare.discount && (
              <Badge variant="outline" className="bg-accent/20 text-accent-foreground">
                {fare.discount}% OFF
              </Badge>
            )}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">From - To</div>
            <div className="font-medium">
              {fare.route.from} - {fare.route.to}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Departure</div>
            <div className="font-medium">{fare.departureTime}</div>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-muted-foreground mr-1" />
            <span>{fare.duration}</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {fare.amenities.map((amenity, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {amenity}
            </Badge>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <AlertCircle className="h-3 w-3 mr-1" />
                Report Issue
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Report Fare Issue</DialogTitle>
                <DialogDescription>
                  Let us know if there's an issue with this fare information.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">What issue would you like to report?</p>
                  <div className="grid grid-cols-1 gap-2">
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={() => onReportIssue(fare.id)}
                    >
                      Incorrect price
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={() => onReportIssue(fare.id)}
                    >
                      Service no longer available
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={() => onReportIssue(fare.id)}
                    >
                      Wrong schedule information
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={() => onReportIssue(fare.id)}
                    >
                      Other issue
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default FareCard;


import React, { useState } from 'react';
import { Star, Clock, AlertCircle, Truck, ShieldCheck, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FareData } from '../data/fakeData';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerTrigger } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';

interface FareCardProps {
  fare: FareData;
  onReportIssue: (fareId: string) => void;
  onBookNow?: (fareId: string) => void;
  onViewReviews?: (fareId: string) => void;
}

const transportIcons: Record<string, React.ReactElement> = {
  'bus': <Truck className="h-4 w-4" />,
  'train': <Truck className="h-4 w-4" />,
  'ferry': <Truck className="h-4 w-4" />,
  'flight': <Truck className="h-4 w-4" />,
};

const FareCard: React.FC<FareCardProps> = ({ fare, onReportIssue, onBookNow, onViewReviews }) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [bookingInfo, setBookingInfo] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    seats: 1
  });
  
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bookingInfo.name || !bookingInfo.date || (!bookingInfo.email && !bookingInfo.phone)) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would call an API to create a booking
    toast({
      title: "Booking submitted",
      description: "Your booking request has been sent to the transport company",
    });
    
    // Reset form
    setBookingInfo({
      name: '',
      email: '',
      phone: '',
      date: '',
      seats: 1
    });
  };

  const BookingForm = () => (
    <form onSubmit={handleBookingSubmit} className="space-y-4">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            value={bookingInfo.name} 
            onChange={(e) => setBookingInfo({...bookingInfo, name: e.target.value})} 
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            value={bookingInfo.email} 
            onChange={(e) => setBookingInfo({...bookingInfo, email: e.target.value})} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input 
            id="phone" 
            value={bookingInfo.phone} 
            onChange={(e) => setBookingInfo({...bookingInfo, phone: e.target.value})} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Travel Date</Label>
          <Input 
            id="date" 
            type="date" 
            value={bookingInfo.date} 
            onChange={(e) => setBookingInfo({...bookingInfo, date: e.target.value})} 
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="seats">Number of Seats</Label>
          <Input 
            id="seats" 
            type="number" 
            min="1" 
            value={bookingInfo.seats} 
            onChange={(e) => setBookingInfo({...bookingInfo, seats: Number(e.target.value)})} 
            required
          />
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        * You will receive confirmation from the company via email or phone
      </div>

      <Button type="submit" className="w-full">Submit Booking</Button>
    </form>
  );

  return (
    <div className="fare-card rounded-lg border bg-card text-card-foreground shadow">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center mr-4">
              {transportIcons[fare.transportType] || <Truck className="h-6 w-6" />}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold">{fare.company}</h3>
                {fare.verified && (
                  <ShieldCheck className="h-4 w-4 text-primary" aria-label="Verified Company" />
                )}
                {fare.featured && (
                  <Badge variant="outline" className="bg-accent/20 text-accent-foreground">
                    Featured
                  </Badge>
                )}
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="ml-1 text-sm">{fare.rating}</span>
                <Button variant="link" size="sm" className="p-0 ml-1" onClick={() => onViewReviews?.(fare.id)}>
                  <span className="text-xs underline">View Reviews</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end">
              {fare.discount ? (
                <>
                  <span className="text-sm line-through text-gray-500 mr-2">
                    ₦{fare.price.toLocaleString()}
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    ₦{(fare.price * (1 - fare.discount / 100)).toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold">
                  ₦{fare.price.toLocaleString()}
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

        <div className="mt-6 flex justify-between items-center">
          {isMobile ? (
            <Drawer>
              <DrawerTrigger asChild>
                <Button>Book Now</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Book Your Trip</DrawerTitle>
                  <DrawerDescription>
                    Complete the form below to request a booking with {fare.company}
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4">
                  <BookingForm />
                </div>
              </DrawerContent>
            </Drawer>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button>Book Now</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Book Your Trip</DialogTitle>
                  <DialogDescription>
                    Complete the form below to request a booking with {fare.company}
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <BookingForm />
                </div>
              </DialogContent>
            </Dialog>
          )}

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

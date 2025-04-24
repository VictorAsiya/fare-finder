import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Star, Clock, TrendingUp, AlertTriangle } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const ManageFares = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFareId, setEditingFareId] = useState<string | null>(null);
  const [isPromotionDialogOpen, setIsPromotionDialogOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("activeFares");

  // Mock data for the fares
  const [fares, setFares] = useState([
    { id: '1', from: 'Enugu', to: 'Nsukka', price: 1500, transportType: 'bus', featured: false, verified: true, lastUpdated: '2023-11-10' },
    { id: '2', from: 'Enugu', to: 'Lagos', price: 18500, transportType: 'bus', featured: true, verified: true, lastUpdated: '2023-11-08' },
    { id: '3', from: 'Enugu', to: 'Abuja', price: 16000, transportType: 'bus', featured: false, verified: true, lastUpdated: '2023-11-05' },
  ]);

  const [promotionRequest, setPromotionRequest] = useState({
    type: 'featured',
    startDate: '',
    endDate: '',
    message: ''
  });

  const [newFare, setNewFare] = useState({
    from: '',
    to: '',
    price: '',
    transportType: 'bus',
    featured: false
  });

  // Mock data for bookings
  const [bookings, setBookings] = useState([
    { id: '1', customerName: 'John Doe', from: 'Enugu', to: 'Nsukka', date: '2023-11-20', seats: 1, status: 'pending' },
    { id: '2', customerName: 'Jane Smith', from: 'Enugu', to: 'Lagos', date: '2023-11-22', seats: 2, status: 'confirmed' },
    { id: '3', customerName: 'Mark Wilson', from: 'Enugu', to: 'Abuja', date: '2023-11-18', seats: 1, status: 'completed' },
  ]);

  // Mock data for reviews
  const [reviews, setReviews] = useState([
    { id: '1', customerName: 'Alice Johnson', rating: 4, comment: 'Great service, on time', date: '2023-11-10', status: 'approved' },
    { id: '2', customerName: 'Bob Smith', rating: 5, comment: 'Excellent journey, very comfortable', date: '2023-11-05', status: 'approved' },
    { id: '3', customerName: 'Charlie Brown', rating: 3, comment: 'Average experience, slightly delayed', date: '2023-11-01', status: 'pending' },
  ]);

  const handleAddFare = () => {
    if (!newFare.from || !newFare.to || !newFare.price) {
      toast({
        title: "Missing Information",
        description: "Please fill in all the required fields.",
        variant: "destructive"
      });
      return;
    }

    const farePrice = parseFloat(newFare.price);
    if (isNaN(farePrice) || farePrice <= 0) {
      toast({
        title: "Invalid Price",
        description: "Please enter a valid fare price.",
        variant: "destructive"
      });
      return;
    }

    if (editingFareId) {
      // Update existing fare
      setFares(fares.map(fare => 
        fare.id === editingFareId ? 
        { 
          ...fare, 
          from: newFare.from, 
          to: newFare.to, 
          price: parseFloat(newFare.price), 
          transportType: newFare.transportType,
          featured: newFare.featured,
          lastUpdated: new Date().toISOString().split('T')[0]
        } : fare
      ));
      
      toast({
        title: "Fare Updated",
        description: "The fare has been successfully updated and will be visible to users immediately.",
      });
    } else {
      // Add new fare
      const newId = (Math.max(...fares.map(f => parseInt(f.id))) + 1).toString();
      setFares([...fares, { 
        id: newId, 
        from: newFare.from, 
        to: newFare.to, 
        price: parseFloat(newFare.price),
        transportType: newFare.transportType,
        featured: newFare.featured,
        verified: false,
        lastUpdated: new Date().toISOString().split('T')[0]
      }]);
      
      toast({
        title: "Fare Added",
        description: "A new fare has been successfully added and is now visible to users.",
      });
    }

    // Reset form
    setNewFare({ from: '', to: '', price: '', transportType: 'bus', featured: false });
    setEditingFareId(null);
    setIsDialogOpen(false);
  };

  const handleEditFare = (fare: any) => {
    setNewFare({
      from: fare.from,
      to: fare.to,
      price: fare.price.toString(),
      transportType: fare.transportType,
      featured: fare.featured
    });
    setEditingFareId(fare.id);
    setIsDialogOpen(true);
  };

  const handleDeleteFare = (id: string) => {
    setFares(fares.filter(fare => fare.id !== id));
    toast({
      title: "Fare Deleted",
      description: "The fare has been successfully removed from the system.",
    });
  };

  const handlePromotionRequest = () => {
    if (!promotionRequest.startDate || !promotionRequest.endDate) {
      toast({
        title: "Missing Information",
        description: "Please select start and end dates for your promotion.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would send the request to the admin
    toast({
      title: "Promotion Requested",
      description: "Your promotion request has been submitted for admin approval.",
    });

    setIsPromotionDialogOpen(false);
    setPromotionRequest({
      type: 'featured',
      startDate: '',
      endDate: '',
      message: ''
    });
  };

  const handleUpdateBookingStatus = (id: string, status: string) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status } : booking
    ));

    toast({
      title: "Booking Updated",
      description: `Booking status has been updated to ${status}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Transportation Services</h1>
        <div className="flex space-x-2">
          <Dialog open={isPromotionDialogOpen} onOpenChange={setIsPromotionDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                Request Promotion
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Request Promotion</DialogTitle>
                <DialogDescription>
                  Request to have your company or fares featured prominently on the platform.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="promo-type" className="text-right">Promotion Type</Label>
                  <Select 
                    value={promotionRequest.type} 
                    onValueChange={(value) => setPromotionRequest({...promotionRequest, type: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select promotion type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured Transport Provider</SelectItem>
                      <SelectItem value="discount">Discount Promotion</SelectItem>
                      <SelectItem value="banner">Banner Advertisement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="start-date" className="text-right">Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={promotionRequest.startDate}
                    onChange={(e) => setPromotionRequest({...promotionRequest, startDate: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="end-date" className="text-right">End Date</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={promotionRequest.endDate}
                    onChange={(e) => setPromotionRequest({...promotionRequest, endDate: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="message" className="text-right">Message</Label>
                  <Input
                    id="message"
                    placeholder="Any additional details..."
                    value={promotionRequest.message}
                    onChange={(e) => setPromotionRequest({...promotionRequest, message: e.target.value})}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handlePromotionRequest}>
                  Submit Request
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setNewFare({ from: '', to: '', price: '', transportType: 'bus', featured: false });
                setEditingFareId(null);
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Fare
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingFareId ? 'Edit Fare' : 'Add New Fare'}</DialogTitle>
                <DialogDescription>
                  {editingFareId ? 'Update the fare details below.' : 'Enter the details for the new fare.'}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="from" className="text-right">From</Label>
                  <Input
                    id="from"
                    value={newFare.from}
                    onChange={(e) => setNewFare({...newFare, from: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="to" className="text-right">To</Label>
                  <Input
                    id="to"
                    value={newFare.to}
                    onChange={(e) => setNewFare({...newFare, to: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">Price (₦)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={newFare.price}
                    onChange={(e) => setNewFare({...newFare, price: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="transportType" className="text-right">Type</Label>
                  <Select 
                    value={newFare.transportType} 
                    onValueChange={(value) => setNewFare({...newFare, transportType: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select transport type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bus">Bus</SelectItem>
                      <SelectItem value="train">Train</SelectItem>
                      <SelectItem value="ferry">Ferry</SelectItem>
                      <SelectItem value="flight">Flight</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddFare}>
                  {editingFareId ? 'Save Changes' : 'Add Fare'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Tabs defaultValue="activeFares" onValueChange={setCurrentTab}>
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="activeFares">Active Fares</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="activeFares" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Fares</CardTitle>
              <CardDescription>Manage your transportation fares</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fares.map((fare) => (
                    <TableRow key={fare.id}>
                      <TableCell>{fare.from}</TableCell>
                      <TableCell>{fare.to}</TableCell>
                      <TableCell>₦{fare.price.toLocaleString()}</TableCell>
                      <TableCell className="capitalize">{fare.transportType}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {fare.featured && <Badge>Featured</Badge>}
                          {fare.verified && <Badge variant="outline">Verified</Badge>}
                        </div>
                      </TableCell>
                      <TableCell>{fare.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEditFare(fare)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteFare(fare.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Bookings</CardTitle>
              <CardDescription>Manage customer bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Travel Date</TableHead>
                    <TableHead>Seats</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>{booking.customerName}</TableCell>
                      <TableCell>{booking.from} - {booking.to}</TableCell>
                      <TableCell>{booking.date}</TableCell>
                      <TableCell>{booking.seats}</TableCell>
                      <TableCell>
                        <Badge variant={
                          booking.status === 'confirmed' ? 'default' : 
                          booking.status === 'completed' ? 'outline' : 'secondary'
                        }>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {booking.status === 'pending' && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mr-2"
                              onClick={() => handleUpdateBookingStatus(booking.id, 'confirmed')}
                            >
                              Confirm
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleUpdateBookingStatus(booking.id, 'cancelled')}
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                        {booking.status === 'confirmed' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleUpdateBookingStatus(booking.id, 'completed')}
                          >
                            Mark Completed
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
              <CardDescription>View and manage reviews from your customers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Comment</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell>{review.customerName}</TableCell>
                      <TableCell>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{review.comment}</TableCell>
                      <TableCell>{review.date}</TableCell>
                      <TableCell>
                        <Badge variant={review.status === 'approved' ? 'default' : 'outline'}>
                          {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageFares;

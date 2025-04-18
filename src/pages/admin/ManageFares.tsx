import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminManageFares = () => {
  const { toast } = useToast();
  const [viewingFare, setViewingFare] = useState(null);
  
  // Mock data for fares pending approval
  const [pendingFares, setPendingFares] = useState([
    { id: '1', company: 'Express Transit', route: 'City A to City B', oldPrice: 25.00, newPrice: 27.50, submittedOn: '2023-08-15', status: 'pending' },
    { id: '2', company: 'Metro Lines', route: 'City C to City D', oldPrice: 18.50, newPrice: 22.00, submittedOn: '2023-08-14', status: 'pending' },
    { id: '3', company: 'City Ferries', route: 'Harbor to Downtown', oldPrice: 12.00, newPrice: 15.00, submittedOn: '2023-08-12', status: 'pending' },
  ]);
  
  // Mock data for all fares
  const [allFares, setAllFares] = useState([
    { id: '4', company: 'Express Transit', route: 'City B to City C', price: 15.00, status: 'active', lastUpdated: '2023-07-20' },
    { id: '5', company: 'Metro Lines', route: 'City A to City D', price: 32.00, status: 'active', lastUpdated: '2023-07-15' },
    { id: '6', company: 'City Ferries', route: 'Downtown to Island', price: 22.00, status: 'active', lastUpdated: '2023-07-10' },
    ...pendingFares.map(fare => ({ 
      id: fare.id, 
      company: fare.company, 
      route: fare.route, 
      price: fare.newPrice, 
      status: fare.status, 
      lastUpdated: fare.submittedOn 
    }))
  ]);

  const approveFare = (id: string) => {
    // Update pending fares list
    setPendingFares(pendingFares.map(fare => 
      fare.id === id ? { ...fare, status: 'approved' } : fare
    ));
    
    // Update all fares list
    setAllFares(allFares.map(fare => 
      fare.id === id ? { ...fare, status: 'active' } : fare
    ));
    
    toast({
      title: "Fare Approved",
      description: "The fare update has been approved and is now live.",
    });
  };

  const rejectFare = (id: string) => {
    // Update pending fares list
    setPendingFares(pendingFares.map(fare => 
      fare.id === id ? { ...fare, status: 'rejected' } : fare
    ));
    
    // Update all fares list
    setAllFares(allFares.map(fare => 
      fare.id === id ? { ...fare, status: 'rejected' } : fare
    ));
    
    toast({
      title: "Fare Rejected",
      description: "The fare update has been rejected.",
    });
  };

  const viewFareDetails = (fare: any) => {
    setViewingFare(fare);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Fares</h1>
      
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending Updates</TabsTrigger>
          <TabsTrigger value="all">All Fares</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Fare Updates</CardTitle>
              <CardDescription>Review and manage fare price changes</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Current Price</TableHead>
                    <TableHead>New Price</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingFares.map((fare) => (
                    <TableRow key={fare.id}>
                      <TableCell>{fare.company}</TableCell>
                      <TableCell>{fare.route}</TableCell>
                      <TableCell>${fare.oldPrice.toFixed(2)}</TableCell>
                      <TableCell>${fare.newPrice.toFixed(2)}</TableCell>
                      <TableCell className={fare.newPrice > fare.oldPrice ? "text-red-500" : "text-green-500"}>
                        {fare.newPrice > fare.oldPrice 
                          ? `+${((fare.newPrice - fare.oldPrice) / fare.oldPrice * 100).toFixed(1)}%` 
                          : `-${((fare.oldPrice - fare.newPrice) / fare.oldPrice * 100).toFixed(1)}%`}
                      </TableCell>
                      <TableCell>{fare.submittedOn}</TableCell>
                      <TableCell>
                        <Badge variant={
                          fare.status === 'approved' ? 'default' : 
                          fare.status === 'rejected' ? 'destructive' : 
                          'outline'
                        }>
                          {fare.status.charAt(0).toUpperCase() + fare.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {fare.status === 'pending' && (
                          <>
                            <Button variant="ghost" size="icon" onClick={() => approveFare(fare.id)}>
                              <Check className="h-4 w-4 text-green-500" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => rejectFare(fare.id)}>
                              <X className="h-4 w-4 text-red-500" />
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => viewFareDetails(fare)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Fare Update Details</DialogTitle>
                                  <DialogDescription>
                                    Review the details of this fare update request.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Company</Label>
                                    <div className="col-span-3">{fare.company}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Route</Label>
                                    <div className="col-span-3">{fare.route}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Current Price</Label>
                                    <div className="col-span-3">${fare.oldPrice.toFixed(2)}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">New Price</Label>
                                    <div className="col-span-3">${fare.newPrice.toFixed(2)}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Submitted On</Label>
                                    <div className="col-span-3">{fare.submittedOn}</div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => rejectFare(fare.id)}>
                                    Reject
                                  </Button>
                                  <Button onClick={() => approveFare(fare.id)}>
                                    Approve
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="all" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>All Fares</CardTitle>
              <CardDescription>View and manage all fares in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Input placeholder="Search fares..." className="max-w-sm" />
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allFares.map((fare) => (
                    <TableRow key={fare.id}>
                      <TableCell>{fare.company}</TableCell>
                      <TableCell>{fare.route}</TableCell>
                      <TableCell>${fare.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={
                          fare.status === 'active' ? 'default' : 
                          fare.status === 'pending' ? 'outline' : 
                          'destructive'
                        }>
                          {fare.status.charAt(0).toUpperCase() + fare.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{fare.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
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

export default AdminManageFares;

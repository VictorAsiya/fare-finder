
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ManageFares = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFareId, setEditingFareId] = useState<string | null>(null);

  // Mock data for the fares
  const [fares, setFares] = useState([
    { id: '1', from: 'City A', to: 'City B', price: 25.00, transportType: 'bus' },
    { id: '2', from: 'City A', to: 'City C', price: 32.50, transportType: 'train' },
    { id: '3', from: 'City B', to: 'City C', price: 18.75, transportType: 'bus' },
  ]);

  const [newFare, setNewFare] = useState({
    from: '',
    to: '',
    price: '',
    transportType: 'bus'
  });

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
        { ...fare, from: newFare.from, to: newFare.to, price: parseFloat(newFare.price), transportType: newFare.transportType } : 
        fare
      ));
      
      toast({
        title: "Fare Updated",
        description: "The fare has been successfully updated.",
      });
    } else {
      // Add new fare
      const newId = (Math.max(...fares.map(f => parseInt(f.id))) + 1).toString();
      setFares([...fares, { 
        id: newId, 
        from: newFare.from, 
        to: newFare.to, 
        price: parseFloat(newFare.price),
        transportType: newFare.transportType
      }]);
      
      toast({
        title: "Fare Added",
        description: "A new fare has been successfully added.",
      });
    }

    // Reset form
    setNewFare({ from: '', to: '', price: '', transportType: 'bus' });
    setEditingFareId(null);
    setIsDialogOpen(false);
  };

  const handleEditFare = (fare: typeof fares[0]) => {
    setNewFare({
      from: fare.from,
      to: fare.to,
      price: fare.price.toString(),
      transportType: fare.transportType
    });
    setEditingFareId(fare.id);
    setIsDialogOpen(true);
  };

  const handleDeleteFare = (id: string) => {
    setFares(fares.filter(fare => fare.id !== id));
    toast({
      title: "Fare Deleted",
      description: "The fare has been successfully removed.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Fares</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setNewFare({ from: '', to: '', price: '', transportType: 'bus' });
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
                <Label htmlFor="price" className="text-right">Price ($)</Label>
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
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fares.map((fare) => (
                <TableRow key={fare.id}>
                  <TableCell>{fare.from}</TableCell>
                  <TableCell>{fare.to}</TableCell>
                  <TableCell>${fare.price.toFixed(2)}</TableCell>
                  <TableCell className="capitalize">{fare.transportType}</TableCell>
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
    </div>
  );
};

export default ManageFares;

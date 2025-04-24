
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const CompanyDashboard = () => {
  // Mock data for the dashboard
  const recentFares = [
    { id: '1', route: 'City A to City B', price: 25.00, lastUpdated: '2 hours ago' },
    { id: '2', route: 'City A to City C', price: 32.50, lastUpdated: '1 day ago' },
    { id: '3', route: 'City B to City C', price: 18.75, lastUpdated: '3 days ago' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Company Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Fares</CardTitle>
            <CardDescription>Number of active fare routes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Average Fare</CardTitle>
            <CardDescription>Mean price across all routes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$27.50</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Updates</CardTitle>
            <CardDescription>Fare changes this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">18</div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Fare Updates</CardTitle>
          <CardDescription>Latest changes to your fare prices</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Route</TableHead>
                <TableHead>Current Price</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentFares.map((fare) => (
                <TableRow key={fare.id}>
                  <TableCell>{fare.route}</TableCell>
                  <TableCell>${fare.price.toFixed(2)}</TableCell>
                  <TableCell>{fare.lastUpdated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Price Trends</CardTitle>
              <CardDescription>Your fare changes over time</CardDescription>
            </div>
            <LineChart className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center">
            <p className="text-muted-foreground">Price trend charts will appear here</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Popular Routes</CardTitle>
              <CardDescription>Most viewed fare routes</CardDescription>
            </div>
            <BarChart className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center">
            <p className="text-muted-foreground">Route popularity charts will appear here</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyDashboard;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PriceHistory = () => {
  // Mock data for price history
  const priceHistoryData = [
    { date: 'Jan', price: 25.00 },
    { date: 'Feb', price: 25.00 },
    { date: 'Mar', price: 27.50 },
    { date: 'Apr', price: 27.50 },
    { date: 'May', price: 30.00 },
    { date: 'Jun', price: 30.00 },
    { date: 'Jul', price: 32.50 },
    { date: 'Aug', price: 32.50 },
  ];

  // Mock data for price updates
  const priceUpdates = [
    { id: '1', route: 'City A to City B', oldPrice: 25.00, newPrice: 27.50, date: '2023-03-01', reason: 'Fuel price increase' },
    { id: '2', route: 'City A to City B', oldPrice: 27.50, newPrice: 30.00, date: '2023-05-01', reason: 'Seasonal adjustment' },
    { id: '3', route: 'City A to City B', oldPrice: 30.00, newPrice: 32.50, date: '2023-07-01', reason: 'Operating cost increase' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Price History</h1>
      
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <Label htmlFor="route">Select Route</Label>
          <Select defaultValue="route1">
            <SelectTrigger id="route">
              <SelectValue placeholder="Select route" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="route1">City A to City B</SelectItem>
              <SelectItem value="route2">City A to City C</SelectItem>
              <SelectItem value="route3">City B to City C</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="sm:col-span-1">
          <Label htmlFor="from-date">From</Label>
          <Input id="from-date" type="date" />
        </div>
        
        <div className="sm:col-span-1">
          <Label htmlFor="to-date">To</Label>
          <Input id="to-date" type="date" />
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Price Trend - City A to City B</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer config={{ price: { color: "#0ea5e9" } }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceHistoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={(value) => `$${value}`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="stepAfter" 
                    dataKey="price" 
                    stroke="var(--color-price)" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Price Update History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Route</TableHead>
                <TableHead>Old Price</TableHead>
                <TableHead>New Price</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {priceUpdates.map((update) => (
                <TableRow key={update.id}>
                  <TableCell>{update.route}</TableCell>
                  <TableCell>${update.oldPrice.toFixed(2)}</TableCell>
                  <TableCell>${update.newPrice.toFixed(2)}</TableCell>
                  <TableCell className={update.newPrice > update.oldPrice ? "text-red-500" : "text-green-500"}>
                    {update.newPrice > update.oldPrice 
                      ? `+$${(update.newPrice - update.oldPrice).toFixed(2)}` 
                      : `-$${(update.oldPrice - update.newPrice).toFixed(2)}`}
                  </TableCell>
                  <TableCell>{update.date}</TableCell>
                  <TableCell>{update.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// Custom tooltip for the chart
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded p-2 shadow-md">
        <p className="text-sm">{`Date: ${payload[0].payload.date}`}</p>
        <p className="text-sm font-bold">{`Price: $${payload[0].value.toFixed(2)}`}</p>
      </div>
    );
  }

  return null;
};

export default PriceHistory;

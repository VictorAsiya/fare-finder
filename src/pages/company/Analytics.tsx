
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  // Mock data for the analytics
  const monthlyData = [
    { name: 'Jan', value: 32 },
    { name: 'Feb', value: 45 },
    { name: 'Mar', value: 53 },
    { name: 'Apr', value: 61 },
    { name: 'May', value: 48 },
    { name: 'Jun', value: 52 },
    { name: 'Jul', value: 57 },
    { name: 'Aug', value: 62 },
  ];

  const routePopularity = [
    { name: 'City A to City B', value: 45 },
    { name: 'City A to City C', value: 32 },
    { name: 'City B to City C', value: 25 },
    { name: 'City B to City D', value: 18 },
    { name: 'City C to City D', value: 15 },
  ];

  const priceComparisonData = [
    { name: 'Jan', company: 25, competitor1: 28, competitor2: 22 },
    { name: 'Feb', company: 25, competitor1: 29, competitor2: 24 },
    { name: 'Mar', company: 27.5, competitor1: 30, competitor2: 25 },
    { name: 'Apr', company: 27.5, competitor1: 31, competitor2: 26 },
    { name: 'May', company: 30, competitor1: 32, competitor2: 28 },
    { name: 'Jun', company: 30, competitor1: 34, competitor2: 29 },
    { name: 'Jul', company: 32.5, competitor1: 35, competitor2: 31 },
    { name: 'Aug', company: 32.5, competitor1: 36, competitor2: 33 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A4DE6C'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">Analytics & Reports</h1>
        <Select defaultValue="lastSixMonths">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lastMonth">Last Month</SelectItem>
            <SelectItem value="lastThreeMonths">Last 3 Months</SelectItem>
            <SelectItem value="lastSixMonths">Last 6 Months</SelectItem>
            <SelectItem value="lastYear">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Price Updates Frequency</CardTitle>
            <CardDescription>Number of fare updates per month</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={{ updates: { color: "#0ea5e9" } }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" name="Updates" fill="var(--color-updates)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Route Popularity</CardTitle>
            <CardDescription>Most viewed routes by users</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={routePopularity}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {routePopularity.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} views`, 'Views']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Fare Price Comparison</CardTitle>
          <CardDescription>Your prices compared to competitors</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ChartContainer config={{ 
            company: { color: "#0ea5e9", label: "Your Company" },
            competitor1: { color: "#f97316", label: "Competitor A" },
            competitor2: { color: "#84cc16", label: "Competitor B" }
          }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `$${value}`} />
                <Tooltip formatter={(value) => [`$${value}`, '']} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="company" 
                  stroke="var(--color-company)" 
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="competitor1" 
                  stroke="var(--color-competitor1)" 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="competitor2" 
                  stroke="var(--color-competitor2)" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const AdminAnalytics = () => {
  // Mock data for the analytics
  const userActivityData = [
    { name: 'Jan', searches: 1200, reports: 45, views: 3200 },
    { name: 'Feb', searches: 1900, reports: 60, views: 4100 },
    { name: 'Mar', searches: 2100, reports: 75, views: 4500 },
    { name: 'Apr', searches: 2400, reports: 90, views: 5200 },
    { name: 'May', searches: 2800, reports: 120, views: 6100 },
    { name: 'Jun', searches: 3100, reports: 135, views: 6800 },
    { name: 'Jul', searches: 3400, reports: 150, views: 7200 },
    { name: 'Aug', searches: 3800, reports: 180, views: 8100 },
  ];

  const fareUpdatesData = [
    { name: 'Jan', increases: 32, decreases: 12 },
    { name: 'Feb', increases: 40, decreases: 18 },
    { name: 'Mar', increases: 45, decreases: 15 },
    { name: 'Apr', increases: 38, decreases: 20 },
    { name: 'May', increases: 52, decreases: 10 },
    { name: 'Jun', increases: 58, decreases: 8 },
    { name: 'Jul', increases: 65, decreases: 5 },
    { name: 'Aug', increases: 70, decreases: 3 },
  ];

  const companyDistributionData = [
    { name: 'Bus Companies', value: 45 },
    { name: 'Train Operators', value: 30 },
    { name: 'Ferry Services', value: 15 },
    { name: 'Flight Services', value: 10 },
  ];

  const priceIndexData = [
    { name: 'Jan', index: 100 },
    { name: 'Feb', index: 102 },
    { name: 'Mar', index: 105 },
    { name: 'Apr', index: 108 },
    { name: 'May', index: 112 },
    { name: 'Jun', index: 118 },
    { name: 'Jul', index: 122 },
    { name: 'Aug', index: 125 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">Analytics & Logs</h1>
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
      
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Activity</TabsTrigger>
          <TabsTrigger value="prices">Price Trends</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>Searches, views, and reports over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer config={{ 
                  searches: { color: "#0ea5e9", label: "Searches" },
                  views: { color: "#84cc16", label: "Views" },
                  reports: { color: "#f97316", label: "Reports" }
                }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={userActivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="searches" 
                        stroke="var(--color-searches)" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="views" 
                        stroke="var(--color-views)" 
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="reports" 
                        stroke="var(--color-reports)" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Fare Price Index</CardTitle>
                <CardDescription>Average fare price trend (Jan = 100)</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer config={{ index: { color: "#0ea5e9" } }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={priceIndexData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="index" 
                        stroke="var(--color-index)" 
                        fill="var(--color-index)" 
                        fillOpacity={0.2} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Fare Updates</CardTitle>
                <CardDescription>Price increases vs decreases</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer config={{ 
                  increases: { color: "#ef4444", label: "Price Increases" },
                  decreases: { color: "#22c55e", label: "Price Decreases" }
                }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={fareUpdatesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="increases" fill="var(--color-increases)" />
                      <Bar dataKey="decreases" fill="var(--color-decreases)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Company Distribution</CardTitle>
                <CardDescription>Companies by transport type</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={companyDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {companyDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Detailed User Activity</CardTitle>
              <CardDescription>Comprehensive view of user interactions</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <p className="text-muted-foreground mb-4">
                This section will show detailed analytics about user behavior, 
                including search patterns, most viewed routes, and report frequency.
              </p>
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">Detailed charts will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="prices" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Price Trend Analysis</CardTitle>
              <CardDescription>Detailed fare price analytics</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <p className="text-muted-foreground mb-4">
                This section will show comprehensive price trend analysis, including 
                route-specific changes, seasonal variations, and price forecasting.
              </p>
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">Detailed price charts will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="companies" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Analytics</CardTitle>
              <CardDescription>Performance metrics for transport providers</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <p className="text-muted-foreground mb-4">
                This section will show detailed analytics about company performance, 
                including update frequency, user engagement metrics, and verification rates.
              </p>
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">Detailed company charts will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAnalytics;


import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, LineChart, PieChart, Users, ShieldCheck, Star, MessageSquare, BadgeCheck, ArrowUpRight } from 'lucide-react';
import { ChartContainer } from "@/components/ui/chart";
import { ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart as RechartsBarChart, Bar } from 'recharts';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const AdminDashboard = () => {
  // Mock data for the dashboard
  const pendingReports = [
    { id: '1', company: 'Express Transit', route: 'Enugu to Nsukka', reportedBy: 'User123', date: '2023-11-15' },
    { id: '2', company: 'GUO Transport', route: 'Enugu to Owerri', reportedBy: 'User456', date: '2023-11-14' },
    { id: '3', company: 'Peace Mass Transit', route: 'Enugu to Abakaliki', reportedBy: 'User789', date: '2023-11-12' },
  ];

  const pendingVerifications = [
    { id: '1', company: 'New Transit Co.', submittedOn: '2023-11-10', status: 'pending' },
    { id: '2', company: 'Regional Express', submittedOn: '2023-11-08', status: 'pending' },
  ];

  const pendingReviews = [
    { id: '1', company: 'Peace Mass Transit', user: 'John Doe', rating: 2, date: '2023-11-15' },
    { id: '2', company: 'GUO Transport', user: 'Mary Smith', rating: 1, date: '2023-11-14' },
  ];

  const pendingPromotions = [
    { id: '1', company: 'ABC Transport', type: 'Featured', date: '2023-11-12' },
    { id: '2', company: 'God is Good Motors', type: 'Discount', date: '2023-11-10' },
  ];

  const priceUpdateTrend = [
    { date: 'Jun', updates: 24 },
    { date: 'Jul', updates: 32 },
    { date: 'Aug', updates: 40 },
    { date: 'Sep', updates: 35 },
    { date: 'Oct', updates: 45 },
    { date: 'Nov', updates: 52 },
  ];

  const bookingStats = [
    { month: 'Jun', bookings: 120 },
    { month: 'Jul', bookings: 150 },
    { month: 'Aug', bookings: 180 },
    { month: 'Sep', bookings: 210 },
    { month: 'Oct', bookings: 240 },
    { month: 'Nov', bookings: 270 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Companies</CardTitle>
            <CardDescription>Registered transport providers</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center">
            <Users className="h-6 w-6 mr-2 text-primary" />
            <div className="text-3xl font-bold">28</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Fares</CardTitle>
            <CardDescription>Total fare listings</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center">
            <BarChart className="h-6 w-6 mr-2 text-primary" />
            <div className="text-3xl font-bold">342</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Pending Reports</CardTitle>
            <CardDescription>User submitted issues</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center">
            <LineChart className="h-6 w-6 mr-2 text-primary" />
            <div className="text-3xl font-bold">12</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Verified Companies</CardTitle>
            <CardDescription>Trusted transport providers</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center">
            <ShieldCheck className="h-6 w-6 mr-2 text-primary" />
            <div className="text-3xl font-bold">18</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Latest user-submitted fare issues</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Reported By</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.company}</TableCell>
                    <TableCell>{report.route}</TableCell>
                    <TableCell>{report.reportedBy}</TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">Review</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <CardFooter className="pt-4">
              <Button variant="outline" size="sm" className="ml-auto" asChild>
                <Link to="/admin/user-reports">
                  View All Reports
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardFooter>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Pending Moderation</CardTitle>
            <CardDescription>Items requiring admin review</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="verifications">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="verifications">
                  <ShieldCheck className="h-4 w-4 mr-1" /> Verifications
                </TabsTrigger>
                <TabsTrigger value="reviews">
                  <Star className="h-4 w-4 mr-1" /> Reviews
                </TabsTrigger>
                <TabsTrigger value="promotions">
                  <BadgeCheck className="h-4 w-4 mr-1" /> Promotions
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="verifications">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingVerifications.map((verification) => (
                      <TableRow key={verification.id}>
                        <TableCell>{verification.company}</TableCell>
                        <TableCell>{verification.submittedOn}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">Verify</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="float-right" asChild>
                    <Link to="/admin/company-management">
                      Manage All Companies
                      <ArrowUpRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingReviews.map((review) => (
                      <TableRow key={review.id}>
                        <TableCell>{review.company}</TableCell>
                        <TableCell>{review.user}</TableCell>
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
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">Moderate</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="float-right" asChild>
                    <Link to="/admin/company-management?tab=reviews">
                      Moderate All Reviews
                      <ArrowUpRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="promotions">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingPromotions.map((promo) => (
                      <TableRow key={promo.id}>
                        <TableCell>{promo.company}</TableCell>
                        <TableCell>{promo.type}</TableCell>
                        <TableCell>{promo.date}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">Review</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="float-right" asChild>
                    <Link to="/admin/company-management?tab=promotions">
                      Manage All Promotions
                      <ArrowUpRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Fare Update Activity</CardTitle>
            <CardDescription>Trend of fare price updates over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={{ updates: { color: "#0ea5e9" } }}>
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={priceUpdateTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="updates" 
                    name="Updates" 
                    stroke="var(--color-updates)" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Booking Statistics</CardTitle>
            <CardDescription>Monthly booking volume trend</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={{ bookings: { color: "#8b5cf6" } }}>
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={bookingStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="bookings" 
                    fill="var(--color-bookings)" 
                    name="Bookings" 
                    radius={[4, 4, 0, 0]}
                  />
                </RechartsBarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

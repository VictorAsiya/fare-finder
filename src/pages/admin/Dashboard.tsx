
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, LineChart, PieChart, Users } from 'lucide-react';
import { ChartContainer } from "@/components/ui/chart";
import { ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const AdminDashboard = () => {
  // Mock data for the dashboard
  const pendingReports = [
    { id: '1', company: 'Express Transit', route: 'City A to City B', reportedBy: 'User123', date: '2023-08-15' },
    { id: '2', company: 'Metro Lines', route: 'City C to City D', reportedBy: 'User456', date: '2023-08-14' },
    { id: '3', company: 'City Ferries', route: 'Harbor to Downtown', reportedBy: 'User789', date: '2023-08-12' },
  ];

  const pendingVerifications = [
    { id: '1', company: 'New Transit Co.', submittedOn: '2023-08-10', status: 'pending' },
    { id: '2', company: 'Regional Express', submittedOn: '2023-08-08', status: 'pending' },
  ];

  const priceUpdateTrend = [
    { date: 'Mar', updates: 24 },
    { date: 'Apr', updates: 32 },
    { date: 'May', updates: 40 },
    { date: 'Jun', updates: 35 },
    { date: 'Jul', updates: 45 },
    { date: 'Aug', updates: 52 },
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
            <CardTitle>Pending Verifications</CardTitle>
            <CardDescription>Company verification requests</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center">
            <PieChart className="h-6 w-6 mr-2 text-primary" />
            <div className="text-3xl font-bold">5</div>
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
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Company Verifications</CardTitle>
            <CardDescription>Pending transportation provider verifications</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingVerifications.map((verification) => (
                  <TableRow key={verification.id}>
                    <TableCell>{verification.company}</TableCell>
                    <TableCell>{verification.submittedOn}</TableCell>
                    <TableCell>
                      <Badge variant="outline">Pending</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">Verify</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Price Update Activity</CardTitle>
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
    </div>
  );
};

export default AdminDashboard;

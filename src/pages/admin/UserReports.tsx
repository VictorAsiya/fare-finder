
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, XCircle, AlertCircle, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UserReports = () => {
  const { toast } = useToast();
  
  // Mock data for pending reports
  const [pendingReports, setPendingReports] = useState([
    { 
      id: '1', 
      company: 'Express Transit', 
      route: 'City A to City B', 
      reportedPrice: 30.00, 
      listedPrice: 25.00, 
      reportedBy: 'user123', 
      reportDate: '2023-08-15', 
      status: 'pending',
      comments: 'The actual fare is higher than what is displayed in the app.'
    },
    { 
      id: '2', 
      company: 'Metro Lines', 
      route: 'City C to City D', 
      reportedPrice: 15.00, 
      listedPrice: 18.50, 
      reportedBy: 'user456', 
      reportDate: '2023-08-14', 
      status: 'pending',
      comments: 'The fare has decreased and is now lower than listed.'
    },
    { 
      id: '3', 
      company: 'City Ferries', 
      route: 'Harbor to Downtown', 
      reportedPrice: 13.50, 
      listedPrice: 12.00, 
      reportedBy: 'user789', 
      reportDate: '2023-08-12', 
      status: 'pending',
      comments: 'The price increased slightly since yesterday.'
    },
  ]);
  
  // Mock data for all reports
  const [allReports, setAllReports] = useState([
    { 
      id: '4', 
      company: 'Express Transit', 
      route: 'City B to City C', 
      reportedPrice: 18.00, 
      listedPrice: 15.00, 
      reportedBy: 'user233', 
      reportDate: '2023-07-20', 
      status: 'resolved',
      comments: 'Price has been updated.'
    },
    { 
      id: '5', 
      company: 'Metro Lines', 
      route: 'City A to City D', 
      reportedPrice: 30.00, 
      listedPrice: 32.00, 
      reportedBy: 'user567', 
      reportDate: '2023-07-15', 
      status: 'dismissed',
      comments: 'Report was incorrect.'
    },
    { 
      id: '6', 
      company: 'City Ferries', 
      route: 'Downtown to Island', 
      reportedPrice: 24.00, 
      listedPrice: 22.00, 
      reportedBy: 'user890', 
      reportDate: '2023-07-10', 
      status: 'resolved',
      comments: 'Price has been updated.'
    },
    ...pendingReports.map(report => ({ ...report }))
  ]);

  const approveReport = (id: string) => {
    // Update pending reports list
    setPendingReports(pendingReports.map(report => 
      report.id === id ? { ...report, status: 'resolved' } : report
    ));
    
    // Update all reports list
    setAllReports(allReports.map(report => 
      report.id === id ? { ...report, status: 'resolved' } : report
    ));
    
    toast({
      title: "Report Resolved",
      description: "The fare report has been verified and the price has been updated.",
    });
  };

  const dismissReport = (id: string) => {
    // Update pending reports list
    setPendingReports(pendingReports.map(report => 
      report.id === id ? { ...report, status: 'dismissed' } : report
    ));
    
    // Update all reports list
    setAllReports(allReports.map(report => 
      report.id === id ? { ...report, status: 'dismissed' } : report
    ));
    
    toast({
      title: "Report Dismissed",
      description: "The fare report has been dismissed as inaccurate.",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">User Reports</h1>
      
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending Reports</TabsTrigger>
          <TabsTrigger value="all">All Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending User Reports</CardTitle>
              <CardDescription>Review user-submitted fare corrections</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Listed Price</TableHead>
                    <TableHead>Reported Price</TableHead>
                    <TableHead>Reported By</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.company}</TableCell>
                      <TableCell>{report.route}</TableCell>
                      <TableCell>${report.listedPrice.toFixed(2)}</TableCell>
                      <TableCell className={report.reportedPrice > report.listedPrice ? "text-red-500" : "text-green-500"}>
                        ${report.reportedPrice.toFixed(2)}
                      </TableCell>
                      <TableCell>{report.reportedBy}</TableCell>
                      <TableCell>
                        <Badge variant={
                          report.status === 'resolved' ? 'default' : 
                          report.status === 'dismissed' ? 'destructive' : 
                          'outline'
                        }>
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {report.status === 'pending' && (
                          <>
                            <Button variant="ghost" size="icon" onClick={() => approveReport(report.id)}>
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => dismissReport(report.id)}>
                              <XCircle className="h-4 w-4 text-red-500" />
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Report Details</DialogTitle>
                                  <DialogDescription>
                                    Review the details of this fare report.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Company</Label>
                                    <div className="col-span-3">{report.company}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Route</Label>
                                    <div className="col-span-3">{report.route}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Listed Price</Label>
                                    <div className="col-span-3">${report.listedPrice.toFixed(2)}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Reported Price</Label>
                                    <div className="col-span-3">${report.reportedPrice.toFixed(2)}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Reported By</Label>
                                    <div className="col-span-3">{report.reportedBy}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Date</Label>
                                    <div className="col-span-3">{report.reportDate}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Comments</Label>
                                    <div className="col-span-3">{report.comments}</div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => dismissReport(report.id)}>
                                    Dismiss
                                  </Button>
                                  <Button onClick={() => approveReport(report.id)}>
                                    Verify & Update
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
              <CardTitle>All Reports</CardTitle>
              <CardDescription>History of user-submitted fare reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Input placeholder="Search reports..." className="max-w-sm" />
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="dismissed">Dismissed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Reported Price</TableHead>
                    <TableHead>Reported By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.company}</TableCell>
                      <TableCell>{report.route}</TableCell>
                      <TableCell>${report.reportedPrice.toFixed(2)}</TableCell>
                      <TableCell>{report.reportedBy}</TableCell>
                      <TableCell>{report.reportDate}</TableCell>
                      <TableCell>
                        <Badge variant={
                          report.status === 'resolved' ? 'default' : 
                          report.status === 'dismissed' ? 'destructive' : 
                          'outline'
                        }>
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </Badge>
                      </TableCell>
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

export default UserReports;

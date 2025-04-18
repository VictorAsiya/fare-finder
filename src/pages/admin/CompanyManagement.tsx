
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CompanyManagement = () => {
  const { toast } = useToast();
  
  // Mock data for pending companies
  const [pendingCompanies, setPendingCompanies] = useState([
    { id: '1', name: 'Express Transit', type: 'Bus', contactPerson: 'John Doe', contactEmail: 'john@expresstransit.com', submittedOn: '2023-08-15', status: 'pending' },
    { id: '2', name: 'Metro Lines', type: 'Train', contactPerson: 'Jane Smith', contactEmail: 'jane@metrolines.com', submittedOn: '2023-08-14', status: 'pending' },
    { id: '3', name: 'City Ferries', type: 'Ferry', contactPerson: 'Robert Brown', contactEmail: 'robert@cityferries.com', submittedOn: '2023-08-12', status: 'pending' },
  ]);
  
  // Mock data for all companies
  const [allCompanies, setAllCompanies] = useState([
    { id: '4', name: 'Urban Transport', type: 'Bus', contactPerson: 'Sarah Johnson', contactEmail: 'sarah@urbantransport.com', submittedOn: '2023-07-20', status: 'active' },
    { id: '5', name: 'Rail Connect', type: 'Train', contactPerson: 'Michael Wilson', contactEmail: 'michael@railconnect.com', submittedOn: '2023-07-15', status: 'active' },
    { id: '6', name: 'Harbor Shuttles', type: 'Ferry', contactPerson: 'Emily Davis', contactEmail: 'emily@harborshuttles.com', submittedOn: '2023-07-10', status: 'active' },
    ...pendingCompanies.map(company => ({ ...company }))
  ]);

  const approveCompany = (id: string) => {
    // Update pending companies list
    setPendingCompanies(pendingCompanies.map(company => 
      company.id === id ? { ...company, status: 'approved' } : company
    ));
    
    // Update all companies list
    setAllCompanies(allCompanies.map(company => 
      company.id === id ? { ...company, status: 'active' } : company
    ));
    
    toast({
      title: "Company Approved",
      description: "The company has been verified and is now active on the platform.",
    });
  };

  const rejectCompany = (id: string) => {
    // Update pending companies list
    setPendingCompanies(pendingCompanies.map(company => 
      company.id === id ? { ...company, status: 'rejected' } : company
    ));
    
    // Update all companies list
    setAllCompanies(allCompanies.map(company => 
      company.id === id ? { ...company, status: 'rejected' } : company
    ));
    
    toast({
      title: "Company Rejected",
      description: "The company verification request has been rejected.",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Company Management</h1>
      
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending Verification</TabsTrigger>
          <TabsTrigger value="all">All Companies</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Company Verifications</CardTitle>
              <CardDescription>Review and verify transport companies</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Submitted On</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingCompanies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell>{company.name}</TableCell>
                      <TableCell>{company.type}</TableCell>
                      <TableCell>{company.contactPerson}</TableCell>
                      <TableCell>{company.submittedOn}</TableCell>
                      <TableCell>
                        <Badge variant={
                          company.status === 'approved' ? 'default' : 
                          company.status === 'rejected' ? 'destructive' : 
                          'outline'
                        }>
                          {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {company.status === 'pending' && (
                          <>
                            <Button variant="ghost" size="icon" onClick={() => approveCompany(company.id)}>
                              <Check className="h-4 w-4 text-green-500" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => rejectCompany(company.id)}>
                              <X className="h-4 w-4 text-red-500" />
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Company Details</DialogTitle>
                                  <DialogDescription>
                                    Review the details of this company verification request.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Company Name</Label>
                                    <div className="col-span-3">{company.name}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Type</Label>
                                    <div className="col-span-3">{company.type}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Contact Person</Label>
                                    <div className="col-span-3">{company.contactPerson}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Contact Email</Label>
                                    <div className="col-span-3">{company.contactEmail}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Submitted On</Label>
                                    <div className="col-span-3">{company.submittedOn}</div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => rejectCompany(company.id)}>
                                    Reject
                                  </Button>
                                  <Button onClick={() => approveCompany(company.id)}>
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
              <CardTitle>All Companies</CardTitle>
              <CardDescription>View and manage transport companies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Input placeholder="Search companies..." className="max-w-sm" />
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allCompanies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell>{company.name}</TableCell>
                      <TableCell>{company.type}</TableCell>
                      <TableCell>{company.contactPerson}</TableCell>
                      <TableCell>
                        <Badge variant={
                          company.status === 'active' ? 'default' : 
                          company.status === 'rejected' ? 'destructive' : 
                          'outline'
                        }>
                          {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
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

export default CompanyManagement;

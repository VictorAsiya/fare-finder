
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, Eye, Star, MessageSquare, BadgeCheck, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { transportCompanies, fakePromotionRequests } from '@/data/fakeData';

const CompanyManagement = () => {
  const { toast } = useToast();
  
  // Convert transport companies to the format we need
  const initialCompanies = transportCompanies.map(company => ({
    id: company.id,
    name: company.name,
    type: 'Bus',
    contactPerson: `Contact for ${company.name}`,
    contactEmail: `contact@${company.id}.com`,
    submittedOn: '2023-07-15',
    status: company.verified ? 'active' : 'pending'
  }));

  // Mock data for pending companies
  const [pendingCompanies, setPendingCompanies] = useState(initialCompanies.filter(c => c.status === 'pending'));
  
  // Mock data for all companies
  const [allCompanies, setAllCompanies] = useState(initialCompanies);

  // Mock data for promotions
  const [promotionRequests, setPromotionRequests] = useState(fakePromotionRequests);

  // Mock data for reviews needing moderation
  const [pendingReviews, setPendingReviews] = useState([
    { id: '1', companyName: 'Peace Mass Transit', customerName: 'John Smith', rating: 2, comment: 'Driver was rude and bus was dirty', date: '2023-11-14', status: 'pending' },
    { id: '2', companyName: 'GUO Transport', customerName: 'Mary Johnson', rating: 1, comment: 'Very late departure and uncomfortable seats', date: '2023-11-13', status: 'pending' },
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

  const approvePromotion = (id: string) => {
    setPromotionRequests(promotionRequests.map(promo => 
      promo.id === id ? { ...promo, status: 'approved' } : promo
    ));

    toast({
      title: "Promotion Approved",
      description: "The promotion request has been approved and is now active.",
    });
  };

  const rejectPromotion = (id: string) => {
    setPromotionRequests(promotionRequests.map(promo => 
      promo.id === id ? { ...promo, status: 'rejected' } : promo
    ));

    toast({
      title: "Promotion Rejected",
      description: "The promotion request has been rejected.",
    });
  };

  const approveReview = (id: string) => {
    setPendingReviews(pendingReviews.map(review => 
      review.id === id ? { ...review, status: 'approved' } : review
    ));

    toast({
      title: "Review Approved",
      description: "The review has been approved and is now visible to users.",
    });
  };

  const rejectReview = (id: string) => {
    setPendingReviews(pendingReviews.map(review => 
      review.id === id ? { ...review, status: 'rejected' } : review
    ));

    toast({
      title: "Review Rejected",
      description: "The review has been rejected and will not be shown to users.",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Company Management</h1>
      
      <Tabs defaultValue="pending">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="pending">Pending Verification</TabsTrigger>
          <TabsTrigger value="all">All Companies</TabsTrigger>
          <TabsTrigger value="promotions">Promotion Requests</TabsTrigger>
          <TabsTrigger value="reviews">Review Moderation</TabsTrigger>
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
                                    Approve & Verify
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {pendingCompanies.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        No pending verification requests
                      </TableCell>
                    </TableRow>
                  )}
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
                    <TableHead>Verification</TableHead>
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
                      <TableCell>
                        {company.status === 'active' ? (
                          <div className="flex items-center">
                            <ShieldCheck className="h-4 w-4 text-primary mr-1" />
                            <span className="text-sm">Verified</span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">Unverified</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                        {company.status !== 'active' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => approveCompany(company.id)}
                          >
                            <BadgeCheck className="h-4 w-4 mr-1" />
                            Verify
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="promotions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Promotion Requests</CardTitle>
              <CardDescription>Review and manage promotion requests from companies</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Requested</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {promotionRequests.map((promo) => (
                    <TableRow key={promo.id}>
                      <TableCell>{promo.companyName}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {promo.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{promo.requestDate}</TableCell>
                      <TableCell>{promo.startDate} to {promo.endDate}</TableCell>
                      <TableCell>
                        <Badge variant={
                          promo.status === 'approved' ? 'default' : 
                          promo.status === 'rejected' ? 'destructive' : 
                          'secondary'
                        }>
                          {promo.status.charAt(0).toUpperCase() + promo.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {promo.status === 'pending' && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mr-2"
                              onClick={() => approvePromotion(promo.id)}
                            >
                              Approve
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => rejectPromotion(promo.id)}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {promotionRequests.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        No pending promotion requests
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Review Moderation</CardTitle>
              <CardDescription>Moderate user reviews for transport companies</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Review</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingReviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell>{review.companyName}</TableCell>
                      <TableCell>{review.customerName}</TableCell>
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
                      <TableCell>{review.comment}</TableCell>
                      <TableCell>{review.date}</TableCell>
                      <TableCell className="text-right">
                        {review.status === 'pending' && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mr-2"
                              onClick={() => approveReview(review.id)}
                            >
                              Approve
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => rejectReview(review.id)}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {pendingReviews.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        No reviews pending moderation
                      </TableCell>
                    </TableRow>
                  )}
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


import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { transportFares } from '@/data/fakeData';

const Report = () => {
  const [reportType, setReportType] = useState('price');
  const [company, setCompany] = useState('');
  const [route, setRoute] = useState('');
  const [reportDetails, setReportDetails] = useState('');
  const [correctPrice, setCorrectPrice] = useState('');
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  // Get unique companies from transport fares
  const companies = [...new Set(transportFares.map(fare => fare.company))];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!company || !route || !reportDetails) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would send the report to the backend
    toast({
      title: "Report submitted",
      description: "Thank you for your feedback! We'll review it shortly.",
    });
    
    // Clear form
    setCompany('');
    setRoute('');
    setReportDetails('');
    setCorrectPrice('');
    setEmail('');
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Report Fare Issues</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Submit a Report</CardTitle>
          <CardDescription>
            Let us know if you found incorrect information about a transport fare
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="report-type">Issue Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger id="report-type">
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">Incorrect Price</SelectItem>
                  <SelectItem value="route">Route Information</SelectItem>
                  <SelectItem value="schedule">Schedule Issues</SelectItem>
                  <SelectItem value="other">Other Issue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Transport Company</Label>
              <Select value={company} onValueChange={setCompany}>
                <SelectTrigger id="company">
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map(company => (
                    <SelectItem key={company} value={company}>
                      {company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="route">Route</Label>
              <Input 
                id="route" 
                placeholder="e.g. New York to Boston" 
                value={route}
                onChange={(e) => setRoute(e.target.value)}
              />
            </div>
            
            {reportType === 'price' && (
              <div className="space-y-2">
                <Label htmlFor="correct-price">Correct Price ($)</Label>
                <Input 
                  id="correct-price" 
                  type="number" 
                  placeholder="e.g. 49.99"
                  value={correctPrice}
                  onChange={(e) => setCorrectPrice(e.target.value)}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="details">Issue Details</Label>
              <Textarea 
                id="details" 
                placeholder="Please describe the issue in detail..." 
                rows={4}
                value={reportDetails}
                onChange={(e) => setReportDetails(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Your Email (optional)</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="To receive updates on your report"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <Button type="submit" className="w-full">Submit Report</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Report;

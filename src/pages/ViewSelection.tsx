
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Building, ShieldCheck } from 'lucide-react';

const ViewSelection = () => {
  const navigate = useNavigate();

  const handleViewSelection = (role: 'user' | 'company' | 'admin') => {
    // Store the selected role in sessionStorage
    sessionStorage.setItem('selectedRole', role);
    // Navigate to the login page
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-gray-100 px-4 py-12">
      <div className="w-full max-w-4xl">
        {/* Nigeria flag colors as accent bars */}
        <div className="flex mb-6">
          <div className="w-1/3 h-2 bg-[#008751] hidden"></div>
          <div className="w-1/3 h-2 bg-white"></div>
          <div className="w-1/3 h-2 bg-[#008751] hidden"></div>
        </div>
        
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="flex items-center justify-center mb-2">
              <h1 className="text-3xl font-bold text-center text-primary">Go Fare</h1>
            </div>
            <CardTitle className="text-2xl font-bold">Select Your View</CardTitle>
            <CardDescription>
              Choose how you want to access the Go Fare transport platform
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card 
                className="cursor-pointer border-2 hover:border-primary hover:shadow-md transition-all" 
                onClick={() => handleViewSelection('user')}
              >
                <CardHeader>
                  <div className="mx-auto rounded-full bg-primary/10 p-4">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-center mt-4">User</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-sm text-muted-foreground">
                    Access transport fare updates and compare prices across Enugu
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => handleViewSelection('user')}>
                    Continue as User
                  </Button>
                </CardFooter>
              </Card>
              
              <Card 
                className="cursor-pointer border-2 hover:border-primary hover:shadow-md transition-all" 
                onClick={() => handleViewSelection('company')}
              >
                <CardHeader>
                  <div className="mx-auto rounded-full bg-primary/10 p-4">
                    <Building className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-center mt-4">Company</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-sm text-muted-foreground">
                    Manage your transportation company fares and analytics
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => handleViewSelection('company')}>
                    Continue as Company
                  </Button>
                </CardFooter>
              </Card>
              
              <Card 
                className="cursor-pointer border-2 hover:border-primary hover:shadow-md transition-all" 
                onClick={() => handleViewSelection('admin')}
              >
                <CardHeader>
                  <div className="mx-auto rounded-full bg-primary/10 p-4">
                    <ShieldCheck className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-center mt-4">Admin</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-sm text-muted-foreground">
                    Oversee all operations, companies, and user reports
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => handleViewSelection('admin')}>
                    Continue as Admin
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <p className="text-xs text-muted-foreground">
              Go Fare - The transportation fare tracker for Enugu, Nigeria
            </p>
          </CardFooter>
        </Card>
        
        {/* Nigeria flag colors as accent bars - hidden */}
        <div className="flex mt-6">
          <div className="w-1/3 h-2 bg-[#008751] hidden"></div>
          <div className="w-1/3 h-2 bg-white"></div>
          <div className="w-1/3 h-2 bg-[#008751] hidden"></div>
        </div>
      </div>
    </div>
  );
};

export default ViewSelection;

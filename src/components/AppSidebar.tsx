
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  LineChart, 
  AlertTriangle, 
  Settings, 
  BarChart3, 
  PencilRuler, 
  History, 
  PieChart,
  LayoutDashboard,
  ClipboardCheck,
  Building,
  FileWarning,
  ChartBar,
  LogOut
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  // Get the role from sessionStorage on first load
  const [userRole, setUserRole] = useState<'user' | 'company' | 'admin'>(() => {
    const storedRole = sessionStorage.getItem('selectedRole') as 'user' | 'company' | 'admin' | null;
    return storedRole || 'user';
  });
  
  // Menu items for regular users
  const userMenuItems = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Compare Fares",
      url: "/compare",
      icon: LineChart,
    },
    {
      title: "Report Issues",
      url: "/report",
      icon: AlertTriangle,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ];

  // Menu items for company users
  const companyMenuItems = [
    {
      title: "Dashboard",
      url: "/company/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Manage Fares",
      url: "/company/manage-fares",
      icon: PencilRuler,
    },
    {
      title: "Price History",
      url: "/company/price-history",
      icon: History,
    },
    {
      title: "Analytics",
      url: "/company/analytics",
      icon: BarChart3,
    },
  ];

  // Menu items for admin users
  const adminMenuItems = [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Manage Fares",
      url: "/admin/manage-fares",
      icon: ClipboardCheck,
    },
    {
      title: "Company Management",
      url: "/admin/company-management",
      icon: Building,
    },
    {
      title: "User Reports",
      url: "/admin/user-reports",
      icon: FileWarning,
    },
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: ChartBar,
    },
  ];

  const menuItems = 
    userRole === 'company' ? companyMenuItems : 
    userRole === 'admin' ? adminMenuItems : 
    userMenuItems;
    
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/view-selection');
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
            <span className="font-bold text-sm">GF</span>
          </div>
          <div className="font-bold text-lg">Go Fare</div>
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          {userRole === 'company' ? 'Company Portal' : 
           userRole === 'admin' ? 'Admin Portal' : 
           'User Portal'}
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {userRole === 'company' ? 'Company Portal' : 
             userRole === 'admin' ? 'Admin Portal' : 
             'Navigation'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 mb-4"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
        <div className="text-xs text-muted-foreground">
          Go Fare v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;

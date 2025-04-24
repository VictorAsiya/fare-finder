
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  LineChart, 
  AlertTriangle, 
  Settings, 
  BarChart3, 
  PencilRuler, 
  History, 
  LayoutDashboard,
  ClipboardCheck,
  Building,
  FileWarning,
  ChartBar,
  LogOut,
  ChevronLeft,
  ChevronRight
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
  const [collapsed, setCollapsed] = useState(false);
  
  // Get the role from sessionStorage
  const userRole = sessionStorage.getItem('selectedRole') as 'user' | 'company' | 'admin' || 'user';
  
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

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sidebar className="linear-sidebar border-r border-border/60 bg-card">
      <SidebarHeader className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-primary/10 text-primary flex items-center justify-center">
            <span className="font-medium text-sm">GF</span>
          </div>
          {!collapsed && (
            <div className="font-medium text-base">Go Fare</div>
          )}
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-foreground/70" 
          onClick={toggleCollapse}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </SidebarHeader>
      
      <SidebarSeparator className="bg-border/60" />
      
      <SidebarContent>
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-4 py-2">
              {userRole === 'company' ? 'Company Portal' : 
               userRole === 'admin' ? 'Admin Portal' : 
               'Navigation'}
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    tooltip={collapsed ? item.title : undefined}
                    className={`py-2 ${collapsed ? 'justify-center' : ''}`}
                  >
                    <Link to={item.url} className="flex items-center space-x-3">
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className={`p-4 ${collapsed ? 'flex justify-center' : ''}`}>
        <Button 
          variant="ghost" 
          size="sm"
          className={`text-foreground/70 hover:text-destructive ${collapsed ? 'w-auto' : 'w-full'} flex items-center justify-center`}
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span className="ml-2 text-sm">Logout</span>}
        </Button>
        {!collapsed && (
          <div className="mt-4 text-xs text-muted-foreground text-center">
            Go Fare v1.0
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;

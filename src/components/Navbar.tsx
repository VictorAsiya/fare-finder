
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Bell, User, LogOut, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check if user is logged in based on sessionStorage
  const isLoggedIn = !!sessionStorage.getItem('selectedRole');
  const userRole = sessionStorage.getItem('selectedRole') as 'user' | 'company' | 'admin' | null;
  
  const handleLogout = () => {
    sessionStorage.removeItem('selectedRole');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/view-selection');
  };

  // Define navigation links based on user role
  const getNavLinks = () => {
    switch (userRole) {
      case 'admin':
        return [
          { name: 'Dashboard', path: '/admin/dashboard' },
          { name: 'Manage Fares', path: '/admin/manage-fares' },
          { name: 'Companies', path: '/admin/company-management' },
          { name: 'Reports', path: '/admin/user-reports' },
          { name: 'Analytics', path: '/admin/analytics' }
        ];
      case 'company':
        return [
          { name: 'Dashboard', path: '/company/dashboard' },
          { name: 'Manage Fares', path: '/company/manage-fares' },
          { name: 'Price History', path: '/company/price-history' },
          { name: 'Analytics', path: '/company/analytics' }
        ];
      default: // User role
        return [
          { name: 'Home', path: '/' },
          { name: 'Compare', path: '/compare' },
          { name: 'Report', path: '/report' },
          { name: 'Settings', path: '/settings' }
        ];
    }
  };

  const navLinks = getNavLinks();

  return (
    <nav className="w-full z-40 bg-card border-b border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Desktop Nav Links */}
          <div className="hidden sm:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-foreground/70 hover:text-foreground transition-colors text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {/* Right Section - Search & User */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-foreground">
              <Search className="h-4 w-4" />
            </Button>
            
            {isLoggedIn ? (
              <>
                <Button variant="ghost" size="icon" className="relative text-foreground/70 hover:text-foreground">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1 right-1 block h-1.5 w-1.5 rounded-full bg-accent"></span>
                </Button>
                
                <div className="relative">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0 bg-secondary">
                        <span className="sr-only">Open user menu</span>
                        <User className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to={userRole === 'admin' ? '/admin/dashboard' : 
                                userRole === 'company' ? '/company/dashboard' : 
                                '/settings'} className="w-full">
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={userRole === 'admin' ? '/admin/dashboard' : 
                                userRole === 'company' ? '/company/dashboard' : 
                                '/settings'} className="w-full">
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Saved Routes</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')} className="text-sm">
                  Sign In
                </Button>
                <Button variant="default" size="sm" onClick={() => navigate('/register')} className="text-sm">
                  Sign Up
                </Button>
              </div>
            )}
            
            {/* Mobile menu button */}
            <div className="sm:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-foreground/70 hover:text-foreground"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-card border-t border-border/60">
          <div className="py-2 space-y-1 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block py-2 text-foreground/70 hover:text-foreground text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {!isLoggedIn ? (
            <div className="pt-2 pb-3 border-t border-border/60">
              <div className="flex items-center justify-center space-x-4 px-4 py-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/login');
                  }}
                >
                  Sign In
                </Button>
                <Button 
                  variant="default"
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/register');
                  }}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          ) : (
            <div className="pt-2 pb-3 border-t border-border/60">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-foreground">User Name</div>
                  <div className="text-xs font-medium text-muted-foreground">user@example.com</div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-4">
                <Link
                  to={userRole === 'admin' ? '/admin/dashboard' : 
                      userRole === 'company' ? '/company/dashboard' : 
                      '/settings'}
                  className="block py-2 text-sm text-foreground/70 hover:text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Your Profile
                </Link>
                <Link
                  to={userRole === 'admin' ? '/admin/dashboard' : 
                      userRole === 'company' ? '/company/dashboard' : 
                      '/settings'}
                  className="block py-2 text-sm text-foreground/70 hover:text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-sm text-destructive"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

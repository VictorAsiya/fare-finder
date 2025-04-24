
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Globe, UserCircle, ShieldCheck } from 'lucide-react';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [bookingNotifications, setBookingNotifications] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [reviewReminders, setReviewReminders] = useState(false);
  const [currency, setCurrency] = useState('NGN');
  const [language, setLanguage] = useState('English');
  const [showName, setShowName] = useState(true);
  const [shareBookingHistory, setShareBookingHistory] = useState(false);
  const [shareReviews, setShareReviews] = useState(true);
  const { toast } = useToast();

  const handleSaveSettings = () => {
    // In a real app, this would save settings to the backend or localStorage
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated",
    });
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="display" className="flex items-center">
            <Globe className="h-4 w-4 mr-2" />
            Display
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center">
            <ShieldCheck className="h-4 w-4 mr-2" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center">
            <UserCircle className="h-4 w-4 mr-2" />
            Account
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications" className="flex-1">
                  Enable all notifications
                </Label>
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="email-updates" className="flex-1">
                  Receive email updates
                </Label>
                <Switch
                  id="email-updates"
                  checked={emailUpdates}
                  onCheckedChange={setEmailUpdates}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="booking-notifications" className="flex-1">
                  Booking status notifications
                </Label>
                <Switch
                  id="booking-notifications"
                  checked={bookingNotifications}
                  onCheckedChange={setBookingNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="price-alerts" className="flex-1">
                  Price drop alerts
                </Label>
                <Switch
                  id="price-alerts"
                  checked={priceAlerts}
                  onCheckedChange={setPriceAlerts}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="review-reminders" className="flex-1">
                  Review reminders after trips
                </Label>
                <Switch
                  id="review-reminders"
                  checked={reviewReminders}
                  onCheckedChange={setReviewReminders}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="display">
          <Card>
            <CardHeader>
              <CardTitle>Display Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NGN">NGN (₦)</SelectItem>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Igbo">Igbo</SelectItem>
                    <SelectItem value="Yoruba">Yoruba</SelectItem>
                    <SelectItem value="Hausa">Hausa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="show-name" className="flex-1">
                  Show my real name with reviews
                </Label>
                <Switch
                  id="show-name"
                  checked={showName}
                  onCheckedChange={setShowName}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="share-booking-history" className="flex-1">
                  Share booking history with transport companies
                </Label>
                <Switch
                  id="share-booking-history"
                  checked={shareBookingHistory}
                  onCheckedChange={setShareBookingHistory}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="share-reviews" className="flex-1">
                  Allow my reviews to be featured
                </Label>
                <Switch
                  id="share-reviews"
                  checked={shareReviews}
                  onCheckedChange={setShareReviews}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Email Address</Label>
                <div className="flex gap-2">
                  <span className="border rounded-md px-3 py-2 flex-1 bg-muted">user@example.com</span>
                  <Button variant="outline">Change</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Password</Label>
                <div className="flex gap-2">
                  <span className="border rounded-md px-3 py-2 flex-1 bg-muted">••••••••</span>
                  <Button variant="outline">Change</Button>
                </div>
              </div>

              <div className="pt-4">
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Button className="mt-6" onClick={handleSaveSettings}>
        Save Settings
      </Button>
    </div>
  );
};

export default Settings;

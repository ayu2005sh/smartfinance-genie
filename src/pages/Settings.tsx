
import React, { useEffect } from 'react';
import Card from '@/components/ui-custom/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings as SettingsIcon, User, Bell, Shield, CreditCard, LinkIcon, Save, Moon, Sun } from 'lucide-react';
import AccountIntegration from '@/components/AccountIntegration';
import { Label } from '@/components/ui/label';
import ThemeToggle from '@/components/ThemeToggle';
import CurrencySelector from '@/components/CurrencySelector';
import { usePreferences } from '@/contexts/PreferencesContext';

const Settings = () => {
  useEffect(() => {
    document.title = 'Settings | AIconomy';
  }, []);
  
  const { currency } = usePreferences();
  
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-semibold mb-1">Settings</h1>
      <p className="text-muted-foreground mb-8">Manage your account and preferences</p>
      
      <Tabs defaultValue="profile" className="space-y-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 w-full md:w-auto">
          <TabsTrigger value="profile" className="flex items-center">
            <User className="mr-2 h-4 w-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="accounts" className="flex items-center">
            <LinkIcon className="mr-2 h-4 w-4" /> Accounts
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="mr-2 h-4 w-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center">
            <SettingsIcon className="mr-2 h-4 w-4" /> Preferences
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Shield className="mr-2 h-4 w-4" /> Security
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center">
            <CreditCard className="mr-2 h-4 w-4" /> Billing
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="animate-fade-in">
          <Card variant="glass">
            <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" defaultValue="Alex Johnson" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="alex@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="Enter your phone number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <CurrencySelector />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button>
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="accounts" className="animate-fade-in">
          <AccountIntegration />
        </TabsContent>
        
        <TabsContent value="notifications" className="animate-fade-in">
          <Card variant="glass">
            <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Transaction Alerts</h3>
                  <p className="text-sm text-muted-foreground">Get notified about new transactions</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Budget Notifications</h3>
                  <p className="text-sm text-muted-foreground">Get alerts when you're close to budget limits</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Financial Tips</h3>
                  <p className="text-sm text-muted-foreground">Receive personalized financial advice</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Account Summaries</h3>
                  <p className="text-sm text-muted-foreground">Weekly account summary reports</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Marketing Communications</h3>
                  <p className="text-sm text-muted-foreground">Receive news and promotional offers</p>
                </div>
                <Switch />
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button>Save Preferences</Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences" className="animate-fade-in">
          <Card variant="glass">
            <h2 className="text-xl font-semibold mb-6">App Preferences</h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dateFormat">Date Format</Label>
                <Select defaultValue="mdy">
                  <SelectTrigger id="dateFormat">
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Dark Mode</h3>
                  <p className="text-sm text-muted-foreground">Use dark theme for the application</p>
                </div>
                <ThemeToggle />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Currency</h3>
                  <p className="text-sm text-muted-foreground">Set your preferred currency</p>
                </div>
                <CurrencySelector className="w-40" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Show Transaction Amounts</h3>
                  <p className="text-sm text-muted-foreground">Display amounts in transaction list</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button>Save Preferences</Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="animate-fade-in">
          <Card variant="glass">
            <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" placeholder="Enter current password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" placeholder="Enter new password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
              </div>
              
              <div className="flex items-center justify-between mt-6">
                <div>
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Switch />
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button>Update Security Settings</Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing" className="animate-fade-in">
          <Card variant="glass">
            <h2 className="text-xl font-semibold mb-6">Billing Information</h2>
            
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 mb-6">
              <p className="text-sm">You are currently on the <span className="font-medium">Free Plan</span></p>
              <p className="text-xs text-muted-foreground mt-1">Upgrade to premium for advanced features</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border rounded-lg p-6">
                <h3 className="font-semibold mb-2">Free Plan</h3>
                <p className="text-2xl font-bold mb-4">$0 <span className="text-sm font-normal text-muted-foreground">/month</span></p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">Basic expense tracking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">Monthly budget limits</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">Connect up to 2 accounts</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" disabled>Current Plan</Button>
              </div>
              
              <div className="border rounded-lg p-6 bg-primary/5">
                <h3 className="font-semibold mb-2">Premium Plan</h3>
                <p className="text-2xl font-bold mb-4">$9.99 <span className="text-sm font-normal text-muted-foreground">/month</span></p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">Advanced expense analytics</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">AI-powered insights</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">Unlimited account connections</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">Tax optimization suggestions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">Investment recommendations</span>
                  </li>
                </ul>
                <Button className="w-full">Upgrade Now</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;

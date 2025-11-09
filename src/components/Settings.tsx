import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Bell,
  Lock,
  Palette,
  Globe,
  Shield,
  Zap,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { toast } = useToast();
  
  // User Profile Settings
  const [name, setName] = useState("Admin User");
  const [email, setEmail] = useState("admin@leadgenius.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [company, setCompany] = useState("LeadGenius Inc.");

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [leadAlerts, setLeadAlerts] = useState(true);

  // Appearance Settings
  const [theme, setTheme] = useState("dark");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [language, setLanguage] = useState("en");

  // Privacy & Security
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [dataSharing, setDataSharing] = useState(false);

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="w-full space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Settings</h1>
            <p className="text-slate-400">
              Manage your account and application preferences
            </p>
          </div>
          <Button
            onClick={handleSaveSettings}
            className="bg-gradient-to-r from-blue-500 to-purple-600"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="bg-slate-800/50 border border-slate-700 mb-6">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-400" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-300">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-slate-700 border-slate-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-300">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-slate-700 border-slate-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-slate-300">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-slate-700 border-slate-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-slate-300">
                      Company
                    </Label>
                    <Input
                      id="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="bg-slate-700 border-slate-600"
                    />
                  </div>
                </div>

                <Separator className="bg-slate-700" />

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-slate-300">
                    Profile Picture
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <User className="h-10 w-10 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm">
                        Upload New Photo
                      </Button>
                      <p className="text-xs text-slate-400">
                        JPG, PNG or GIF. Max size 2MB.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Lock className="h-5 w-5 text-amber-400" />
                  Change Password
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password" className="text-slate-300">
                    Current Password
                  </Label>
                  <Input
                    id="current-password"
                    type="password"
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password" className="text-slate-300">
                    New Password
                  </Label>
                  <Input
                    id="new-password"
                    type="password"
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-slate-300">
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
                <Button className="w-full md:w-auto">Update Password</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bell className="h-5 w-5 text-purple-400" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium text-white">Email Notifications</h3>
                    <p className="text-sm text-slate-400">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <Separator className="bg-slate-700" />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium text-white">Push Notifications</h3>
                    <p className="text-sm text-slate-400">
                      Receive browser push notifications
                    </p>
                  </div>
                  <Switch
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>

                <Separator className="bg-slate-700" />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium text-white">SMS Notifications</h3>
                    <p className="text-sm text-slate-400">
                      Get important updates via SMS
                    </p>
                  </div>
                  <Switch
                    checked={smsNotifications}
                    onCheckedChange={setSmsNotifications}
                  />
                </div>

                <Separator className="bg-slate-700" />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium text-white">Weekly Reports</h3>
                    <p className="text-sm text-slate-400">
                      Receive weekly performance reports
                    </p>
                  </div>
                  <Switch
                    checked={weeklyReports}
                    onCheckedChange={setWeeklyReports}
                  />
                </div>

                <Separator className="bg-slate-700" />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium text-white">Lead Alerts</h3>
                    <p className="text-sm text-slate-400">
                      Get notified when new high-priority leads arrive
                    </p>
                  </div>
                  <Switch
                    checked={leadAlerts}
                    onCheckedChange={setLeadAlerts}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Palette className="h-5 w-5 text-pink-400" />
                  Appearance Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-slate-300">Theme</Label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      className={`p-4 rounded-lg border-2 transition-all ${theme === "light" ? "border-blue-500 bg-slate-700" : "border-slate-700 bg-slate-800"}`}
                      onClick={() => setTheme("light")}
                    >
                      <Sun className="h-6 w-6 mx-auto mb-2 text-amber-400" />
                      <p className="text-sm text-white">Light</p>
                    </button>
                    <button
                      className={`p-4 rounded-lg border-2 transition-all ${theme === "dark" ? "border-blue-500 bg-slate-700" : "border-slate-700 bg-slate-800"}`}
                      onClick={() => setTheme("dark")}
                    >
                      <Moon className="h-6 w-6 mx-auto mb-2 text-blue-400" />
                      <p className="text-sm text-white">Dark</p>
                    </button>
                    <button
                      className={`p-4 rounded-lg border-2 transition-all ${theme === "auto" ? "border-blue-500 bg-slate-700" : "border-slate-700 bg-slate-800"}`}
                      onClick={() => setTheme("auto")}
                    >
                      <Zap className="h-6 w-6 mx-auto mb-2 text-purple-400" />
                      <p className="text-sm text-white">Auto</p>
                    </button>
                  </div>
                </div>

                <Separator className="bg-slate-700" />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium text-white flex items-center gap-2">
                      {soundEnabled ? (
                        <Volume2 className="h-5 w-5 text-green-400" />
                      ) : (
                        <VolumeX className="h-5 w-5 text-slate-400" />
                      )}
                      Sound Effects
                    </h3>
                    <p className="text-sm text-slate-400">
                      Play sounds for notifications and actions
                    </p>
                  </div>
                  <Switch
                    checked={soundEnabled}
                    onCheckedChange={setSoundEnabled}
                  />
                </div>

                <Separator className="bg-slate-700" />

                <div className="space-y-2">
                  <Label className="text-slate-300 flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Language
                  </Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="zh">中文</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium text-white">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-sm text-slate-400">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    checked={twoFactorEnabled}
                    onCheckedChange={setTwoFactorEnabled}
                  />
                </div>

                <Separator className="bg-slate-700" />

                <div className="space-y-2">
                  <Label className="text-slate-300">Session Timeout</Label>
                  <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-slate-400">
                    Automatically log out after this period of inactivity
                  </p>
                </div>

                <Separator className="bg-slate-700" />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium text-white">Data Sharing</h3>
                    <p className="text-sm text-slate-400">
                      Share anonymous usage data to help improve the platform
                    </p>
                  </div>
                  <Switch
                    checked={dataSharing}
                    onCheckedChange={setDataSharing}
                  />
                </div>

                <Separator className="bg-slate-700" />

                <div className="space-y-3">
                  <h3 className="font-medium text-white">Active Sessions</h3>
                  <div className="space-y-2">
                    {[
                      {
                        device: "Chrome on Windows",
                        location: "New York, US",
                        current: true,
                      },
                      {
                        device: "Safari on iPhone",
                        location: "New York, US",
                        current: false,
                      },
                    ].map((session, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg"
                      >
                        <div>
                          <p className="text-sm font-medium text-white">
                            {session.device}
                          </p>
                          <p className="text-xs text-slate-400">
                            {session.location}
                            {session.current && " • Current session"}
                          </p>
                        </div>
                        {!session.current && (
                          <Button variant="outline" size="sm">
                            Revoke
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Settings;

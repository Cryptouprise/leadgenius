import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MessageSquare,
  Send,
  Save,
  Calendar,
  Users,
  Target,
  Clock,
  Plus,
  X,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface Campaign {
  id: string;
  name: string;
  type: "email" | "sms";
  status: "draft" | "scheduled" | "active" | "completed";
  recipients: number;
  sent: number;
  opened: number;
  clicked: number;
  scheduled?: Date;
}

const CampaignBuilder = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("campaigns");
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [campaignType, setCampaignType] = useState<"email" | "sms">("email");

  // Form states
  const [campaignName, setCampaignName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [targetAudience, setTargetAudience] = useState("all");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");

  const campaigns: Campaign[] = [
    {
      id: "1",
      name: "Welcome Series - New Leads",
      type: "email",
      status: "active",
      recipients: 245,
      sent: 245,
      opened: 156,
      clicked: 89,
    },
    {
      id: "2",
      name: "Follow-up Campaign",
      type: "sms",
      status: "scheduled",
      recipients: 128,
      sent: 0,
      opened: 0,
      clicked: 0,
      scheduled: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
    {
      id: "3",
      name: "Product Demo Invitation",
      type: "email",
      status: "completed",
      recipients: 312,
      sent: 312,
      opened: 198,
      clicked: 87,
    },
    {
      id: "4",
      name: "High-Intent Lead Nurture",
      type: "email",
      status: "draft",
      recipients: 0,
      sent: 0,
      opened: 0,
      clicked: 0,
    },
  ];

  const templates = [
    {
      id: "1",
      name: "Welcome Email",
      type: "email",
      subject: "Welcome to {CompanyName}!",
      preview: "Thank you for your interest in our services...",
    },
    {
      id: "2",
      name: "Follow-up Message",
      type: "sms",
      subject: "",
      preview: "Hi {FirstName}, following up on our conversation...",
    },
    {
      id: "3",
      name: "Demo Invitation",
      type: "email",
      subject: "Book Your Personalized Demo",
      preview: "We'd love to show you how {ProductName} can...",
    },
  ];

  const handleCreateCampaign = () => {
    toast({
      title: "Campaign Created",
      description: `Your ${campaignType} campaign "${campaignName}" has been created successfully.`,
    });
    setShowNewCampaign(false);
    // Reset form
    setCampaignName("");
    setSubject("");
    setMessage("");
  };

  const getStatusColor = (status: Campaign["status"]) => {
    switch (status) {
      case "draft":
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
      case "scheduled":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "completed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    }
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
            <h1 className="text-2xl font-bold text-white">Campaign Builder</h1>
            <p className="text-slate-400">
              Create and manage email and SMS campaigns
            </p>
          </div>
          <Button
            onClick={() => setShowNewCampaign(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-slate-800/50 border border-slate-700 mb-6">
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-4">
            {campaigns.map((campaign) => (
              <Card
                key={campaign.id}
                className="bg-slate-800/50 border-slate-700 hover:bg-slate-800 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                        {campaign.type === "email" ? (
                          <Mail className="h-6 w-6 text-blue-400" />
                        ) : (
                          <MessageSquare className="h-6 w-6 text-purple-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">
                            {campaign.name}
                          </h3>
                          <Badge
                            variant="outline"
                            className={`${getStatusColor(campaign.status)} border`}
                          >
                            {campaign.status.toUpperCase()}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="bg-slate-700 text-slate-300 border-slate-600"
                          >
                            {campaign.type.toUpperCase()}
                          </Badge>
                        </div>
                        {campaign.scheduled && (
                          <p className="text-sm text-slate-400 mb-3">
                            <Clock className="inline h-4 w-4 mr-1" />
                            Scheduled for{" "}
                            {campaign.scheduled.toLocaleDateString()}{" "}
                            {campaign.scheduled.toLocaleTimeString()}
                          </p>
                        )}
                        <div className="grid grid-cols-4 gap-4">
                          <div>
                            <p className="text-xs text-slate-400">Recipients</p>
                            <p className="text-lg font-bold text-white">
                              {campaign.recipients}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400">Sent</p>
                            <p className="text-lg font-bold text-white">
                              {campaign.sent}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400">Opened</p>
                            <p className="text-lg font-bold text-green-400">
                              {campaign.opened}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400">Clicked</p>
                            <p className="text-lg font-bold text-purple-400">
                              {campaign.clicked}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      {campaign.status === "draft" && (
                        <Button size="sm">
                          <Send className="mr-2 h-4 w-4" />
                          Send
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className="bg-slate-800/50 border-slate-700 hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {template.type === "email" ? (
                          <Mail className="h-5 w-5 text-blue-400" />
                        ) : (
                          <MessageSquare className="h-5 w-5 text-purple-400" />
                        )}
                        <div>
                          <CardTitle className="text-white text-base">
                            {template.name}
                          </CardTitle>
                          <Badge
                            variant="outline"
                            className="mt-1 bg-slate-700 text-slate-300 border-slate-600"
                          >
                            {template.type.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {template.subject && (
                      <p className="text-sm font-medium text-slate-300 mb-2">
                        {template.subject}
                      </p>
                    )}
                    <p className="text-sm text-slate-400">{template.preview}</p>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        Use Template
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Add New Template Card */}
              <Card className="bg-slate-800/50 border-slate-700 border-dashed hover:bg-slate-800 transition-colors cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center h-full p-6">
                  <Plus className="h-12 w-12 text-slate-400 mb-3" />
                  <p className="text-slate-400 font-medium">
                    Create New Template
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {
                  label: "Total Campaigns",
                  value: "12",
                  color: "from-blue-500 to-blue-600",
                  icon: <Target className="h-5 w-5" />,
                },
                {
                  label: "Avg Open Rate",
                  value: "48.5%",
                  color: "from-green-500 to-green-600",
                  icon: <Eye className="h-5 w-5" />,
                },
                {
                  label: "Avg Click Rate",
                  value: "28.3%",
                  color: "from-purple-500 to-purple-600",
                  icon: <MessageSquare className="h-5 w-5" />,
                },
                {
                  label: "Total Sent",
                  value: "3,245",
                  color: "from-amber-500 to-amber-600",
                  icon: <Send className="h-5 w-5" />,
                },
              ].map((stat, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className={`h-10 w-10 rounded-lg bg-gradient-to-br ${stat.color}/20 flex items-center justify-center text-white`}
                      >
                        {stat.icon}
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-white mb-1">
                      {stat.value}
                    </p>
                    <p className="text-sm text-slate-400">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Campaign Performance Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-slate-400">
                  <p>Campaign performance chart would go here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* New Campaign Dialog */}
        <Dialog open={showNewCampaign} onOpenChange={setShowNewCampaign}>
          <DialogContent className="max-w-3xl bg-slate-800 border-slate-700 text-white">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* Campaign Type Selection */}
              <div className="space-y-3">
                <Label>Campaign Type</Label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    className={`p-4 rounded-lg border-2 transition-all ${campaignType === "email" ? "border-blue-500 bg-slate-700" : "border-slate-700 bg-slate-800"}`}
                    onClick={() => setCampaignType("email")}
                  >
                    <Mail className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                    <p className="font-medium">Email Campaign</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Send rich HTML emails
                    </p>
                  </button>
                  <button
                    className={`p-4 rounded-lg border-2 transition-all ${campaignType === "sms" ? "border-purple-500 bg-slate-700" : "border-slate-700 bg-slate-800"}`}
                    onClick={() => setCampaignType("sms")}
                  >
                    <MessageSquare className="h-8 w-8 mx-auto mb-2 text-purple-400" />
                    <p className="font-medium">SMS Campaign</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Send text messages
                    </p>
                  </button>
                </div>
              </div>

              <Separator className="bg-slate-700" />

              {/* Campaign Details */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="campaign-name">Campaign Name</Label>
                  <Input
                    id="campaign-name"
                    placeholder="e.g., Welcome Series - New Leads"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    className="bg-slate-700 border-slate-600"
                  />
                </div>

                {campaignType === "email" && (
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject Line</Label>
                    <Input
                      id="subject"
                      placeholder="Enter email subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="bg-slate-700 border-slate-600"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="message">
                    {campaignType === "email" ? "Email Body" : "Message"}
                  </Label>
                  <Textarea
                    id="message"
                    placeholder={
                      campaignType === "email"
                        ? "Enter your email content..."
                        : "Enter your SMS message (160 characters max)"
                    }
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-slate-700 border-slate-600 min-h-[150px]"
                    maxLength={campaignType === "sms" ? 160 : undefined}
                  />
                  {campaignType === "sms" && (
                    <p className="text-xs text-slate-400">
                      {message.length}/160 characters
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Target Audience</Label>
                    <Select value={targetAudience} onValueChange={setTargetAudience}>
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Leads</SelectItem>
                        <SelectItem value="new">New Leads</SelectItem>
                        <SelectItem value="qualified">Qualified Leads</SelectItem>
                        <SelectItem value="high-intent">High Intent</SelectItem>
                        <SelectItem value="custom">Custom Segment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Schedule</Label>
                    <Select defaultValue="now">
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="now">Send Now</SelectItem>
                        <SelectItem value="later">Schedule for Later</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowNewCampaign(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Draft Saved",
                      description: "Your campaign has been saved as a draft.",
                    });
                  }}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save as Draft
                </Button>
                <Button
                  onClick={handleCreateCampaign}
                  className="bg-gradient-to-r from-blue-500 to-purple-600"
                >
                  <Send className="mr-2 h-4 w-4" />
                  {campaignType === "sms" ? "Send Campaign" : "Send Campaign"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
};

export default CampaignBuilder;

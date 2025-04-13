import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Mail,
  UserPlus,
  ChevronRight,
  Star,
  Clock,
  Phone,
  Calendar,
  ArrowUpRight,
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  score: number;
  status: "new" | "contacted" | "qualified" | "converted";
  lastActivity: string;
  avatar?: string;
}

interface Activity {
  id: string;
  leadId: string;
  type: "message" | "email" | "call" | "meeting";
  description: string;
  timestamp: string;
}

const LeadOverview: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("high-intent");

  // Mock data for leads
  const leads: Lead[] = [
    {
      id: "1",
      name: "Alex Johnson",
      company: "TechCorp Inc.",
      email: "alex@techcorp.com",
      phone: "(555) 123-4567",
      score: 92,
      status: "new",
      lastActivity: "10 minutes ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    },
    {
      id: "2",
      name: "Sarah Williams",
      company: "Innovate Solutions",
      email: "sarah@innovate.co",
      phone: "(555) 987-6543",
      score: 87,
      status: "contacted",
      lastActivity: "1 hour ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    {
      id: "3",
      name: "Michael Chen",
      company: "Global Systems",
      email: "michael@globalsys.com",
      phone: "(555) 456-7890",
      score: 78,
      status: "qualified",
      lastActivity: "3 hours ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    },
    {
      id: "4",
      name: "Jessica Lee",
      company: "Bright Future Ltd",
      email: "jessica@brightfuture.org",
      phone: "(555) 234-5678",
      score: 95,
      status: "new",
      lastActivity: "30 minutes ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica",
    },
    {
      id: "5",
      name: "David Rodriguez",
      company: "Nexus Partners",
      email: "david@nexuspartners.net",
      phone: "(555) 876-5432",
      score: 81,
      status: "contacted",
      lastActivity: "2 hours ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    },
  ];

  // Mock data for activities
  const activities: Activity[] = [
    {
      id: "a1",
      leadId: "1",
      type: "message",
      description: "Sent initial outreach message",
      timestamp: "10 minutes ago",
    },
    {
      id: "a2",
      leadId: "2",
      type: "email",
      description: "Replied to product inquiry",
      timestamp: "1 hour ago",
    },
    {
      id: "a3",
      leadId: "3",
      type: "call",
      description: "Scheduled demo call for next week",
      timestamp: "3 hours ago",
    },
    {
      id: "a4",
      leadId: "4",
      type: "meeting",
      description: "Virtual meeting scheduled",
      timestamp: "30 minutes ago",
    },
    {
      id: "a5",
      leadId: "5",
      type: "message",
      description: "Follow-up message sent",
      timestamp: "2 hours ago",
    },
    {
      id: "a6",
      leadId: "1",
      type: "email",
      description: "Sent pricing information",
      timestamp: "4 hours ago",
    },
    {
      id: "a7",
      leadId: "2",
      type: "call",
      description: "Discussed integration options",
      timestamp: "5 hours ago",
    },
  ];

  // Function to get activity icon based on type
  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "email":
        return <Mail className="h-4 w-4 text-purple-500" />;
      case "call":
        return <Phone className="h-4 w-4 text-green-500" />;
      case "meeting":
        return <Calendar className="h-4 w-4 text-amber-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  // Function to get status badge color
  const getStatusBadge = (status: Lead["status"]) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-500">New</Badge>;
      case "contacted":
        return <Badge className="bg-amber-500">Contacted</Badge>;
      case "qualified":
        return <Badge className="bg-green-500">Qualified</Badge>;
      case "converted":
        return <Badge className="bg-purple-500">Converted</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  // Function to get score color
  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 70) return "bg-blue-500";
    if (score >= 50) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="w-full bg-background p-6 rounded-xl">
      <div className="flex flex-col space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Lead Overview
            </h1>
            <p className="text-muted-foreground">
              Monitor and manage your high-intent leads
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">Export</Button>
            <Button>Add New Lead</Button>
          </div>
        </div>

        {/* Lead Scoring Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Lead Scoring Visualization</CardTitle>
              <CardDescription>
                AI-powered lead qualification scores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[90, 75, 60, 45].map((threshold, index) => (
                  <Card
                    key={index}
                    className="p-4 border-none shadow-md bg-gradient-to-br from-slate-800 to-slate-900"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-white">
                        {threshold >= 90
                          ? "Hot Leads"
                          : threshold >= 70
                            ? "Warm Leads"
                            : threshold >= 50
                              ? "Nurturing"
                              : "Cold Leads"}
                      </h3>
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        className="rounded-full p-1"
                        style={{
                          backgroundColor:
                            threshold >= 90
                              ? "rgb(34, 197, 94)"
                              : threshold >= 70
                                ? "rgb(59, 130, 246)"
                                : threshold >= 50
                                  ? "rgb(245, 158, 11)"
                                  : "rgb(239, 68, 68)",
                        }}
                      >
                        <Star className="h-4 w-4 text-white" />
                      </motion.div>
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">
                      {
                        leads.filter((lead) =>
                          threshold >= 90
                            ? lead.score >= 90
                            : threshold >= 70
                              ? lead.score >= 70 && lead.score < 90
                              : threshold >= 50
                                ? lead.score >= 50 && lead.score < 70
                                : lead.score < 50,
                        ).length
                      }
                    </div>
                    <Progress
                      value={threshold}
                      className="h-2 mb-2"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.1)",
                      }}
                    />
                    <div className="text-xs text-slate-400">
                      {threshold}% qualification threshold
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* High Intent Leads & Activity Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* High Intent Leads */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>High-Intent Leads</CardTitle>
                <CardDescription>
                  Leads requiring immediate attention
                </CardDescription>
                <Tabs
                  defaultValue="high-intent"
                  className="w-full"
                  onValueChange={setSelectedTab}
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="high-intent">High Intent</TabsTrigger>
                    <TabsTrigger value="recent">Recent</TabsTrigger>
                    <TabsTrigger value="all">All Leads</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {leads
                      .filter((lead) => {
                        if (selectedTab === "high-intent")
                          return lead.score >= 80;
                        if (selectedTab === "recent") return true; // In a real app, filter by recent activity
                        return true; // 'all' tab
                      })
                      .map((lead) => (
                        <motion.div
                          key={lead.id}
                          className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar>
                                <AvatarImage
                                  src={lead.avatar}
                                  alt={lead.name}
                                />
                                <AvatarFallback>
                                  {lead.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <h3 className="font-medium">{lead.name}</h3>
                                  {getStatusBadge(lead.status)}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {lead.company}
                                </p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <div className="text-xs text-muted-foreground">
                                    {lead.email}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    •
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {lead.phone}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <div className="flex items-center space-x-1">
                                <div
                                  className={`h-8 w-8 rounded-full flex items-center justify-center ${getScoreColor(lead.score)}`}
                                >
                                  <span className="text-xs font-bold text-white">
                                    {lead.score}
                                  </span>
                                </div>
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Last activity: {lead.lastActivity}
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end mt-4 space-x-2">
                            <Button size="sm" variant="outline">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Message
                            </Button>
                            <Button size="sm" variant="outline">
                              <Mail className="h-4 w-4 mr-1" />
                              Email
                            </Button>
                            <Button size="sm" variant="outline">
                              <UserPlus className="h-4 w-4 mr-1" />
                              Assign
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>

          {/* Activity Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Activity Timeline</CardTitle>
                <CardDescription>
                  Recent interactions with leads
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="relative pl-6 border-l border-border space-y-4">
                    {activities.map((activity, index) => {
                      const lead = leads.find((l) => l.id === activity.leadId);
                      return (
                        <motion.div
                          key={activity.id}
                          className="relative"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <div className="absolute -left-[22px] p-1 rounded-full bg-card border">
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium text-sm">
                                  {lead?.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {lead?.company}
                                </div>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {activity.timestamp}
                              </div>
                            </div>
                            <div className="mt-1 text-sm">
                              {activity.description}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-2 text-xs h-7 px-2 text-blue-500 hover:text-blue-700"
                            >
                              View details
                              <ChevronRight className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {[
            {
              title: "Total Leads",
              value: "247",
              change: "+12%",
              icon: <ArrowUpRight className="h-4 w-4 text-green-500" />,
            },
            {
              title: "Conversion Rate",
              value: "18.3%",
              change: "+2.4%",
              icon: <ArrowUpRight className="h-4 w-4 text-green-500" />,
            },
            {
              title: "Avg. Response Time",
              value: "42m",
              change: "-15%",
              icon: <ArrowUpRight className="h-4 w-4 text-green-500" />,
            },
            {
              title: "Qualified Leads",
              value: "86",
              change: "+8%",
              icon: <ArrowUpRight className="h-4 w-4 text-green-500" />,
            },
          ].map((stat, index) => (
            <Card key={index} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </div>
                  <div className="text-2xl font-bold mt-1">{stat.value}</div>
                </div>
                <div className="flex items-center space-x-1 text-xs font-medium text-green-500">
                  <span>{stat.change}</span>
                  {stat.icon}
                </div>
              </div>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LeadOverview;

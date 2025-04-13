import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  MessageSquare,
  Edit,
  Mail,
  Phone,
  Calendar,
  Clock,
  ArrowUpRight,
  User,
  Building,
  MapPin,
  Tag,
  Activity,
} from "lucide-react";

interface LeadActivity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
}

interface LeadMessage {
  id: string;
  content: string;
  timestamp: string;
  sender: "lead" | "system";
}

interface LeadDetailProps {
  lead?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    position: string;
    location: string;
    source: string;
    score: number;
    status: string;
    tags: string[];
    createdAt: string;
    lastContact: string;
    avatar?: string;
  };
  onSendMessage?: (leadId: string) => void;
  onEditLead?: (leadId: string) => void;
  onForwardToEmail?: (leadId: string) => void;
}

const LeadDetail = ({
  lead = {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Corporation",
    position: "Marketing Director",
    location: "San Francisco, CA",
    source: "Website Contact Form",
    score: 85,
    status: "Qualified",
    tags: ["Enterprise", "High Budget", "Marketing"],
    createdAt: "2023-06-15T10:30:00Z",
    lastContact: "2023-06-18T14:45:00Z",
    avatar: undefined,
  },
  onSendMessage = () => {},
  onEditLead = () => {},
  onForwardToEmail = () => {},
}: LeadDetailProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for activities and messages
  const activities: LeadActivity[] = [
    {
      id: "1",
      type: "visit",
      description: "Visited pricing page",
      timestamp: "2023-06-18T14:30:00Z",
    },
    {
      id: "2",
      type: "form",
      description: "Submitted contact form",
      timestamp: "2023-06-18T14:35:00Z",
    },
    {
      id: "3",
      type: "message",
      description: "Received SMS follow-up",
      timestamp: "2023-06-18T14:45:00Z",
    },
    {
      id: "4",
      type: "email",
      description: "Opened welcome email",
      timestamp: "2023-06-19T09:15:00Z",
    },
    {
      id: "5",
      type: "visit",
      description: "Visited features page",
      timestamp: "2023-06-20T11:22:00Z",
    },
  ];

  const messages: LeadMessage[] = [
    {
      id: "1",
      content: "Hi, I'm interested in learning more about your product.",
      timestamp: "2023-06-18T14:35:00Z",
      sender: "lead",
    },
    {
      id: "2",
      content:
        "Thanks for reaching out! I'd be happy to tell you more about our solutions. What specific features are you most interested in?",
      timestamp: "2023-06-18T14:45:00Z",
      sender: "system",
    },
    {
      id: "3",
      content:
        "I'm particularly interested in your enterprise plan and integration capabilities.",
      timestamp: "2023-06-18T15:02:00Z",
      sender: "lead",
    },
    {
      id: "4",
      content:
        "Great! Our enterprise plan includes advanced integrations with most major CRM systems. Would you like to schedule a demo?",
      timestamp: "2023-06-18T15:10:00Z",
      sender: "system",
    },
  ];

  // Score breakdown data
  const scoreBreakdown = [
    { category: "Engagement", score: 90 },
    { category: "Intent", score: 85 },
    { category: "Budget", score: 80 },
    { category: "Timeline", score: 75 },
    { category: "Fit", score: 95 },
  ];

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  // Get score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <motion.div
      className="bg-background rounded-xl border shadow-lg overflow-hidden w-full max-w-4xl"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header with lead info and actions */}
      <motion.div
        variants={itemVariants}
        className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
      >
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-white">
              <AvatarImage src={lead.avatar} alt={lead.name} />
              <AvatarFallback className="text-lg bg-indigo-800">
                {lead.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{lead.name}</h1>
              <p className="text-indigo-100">
                {lead.position} at {lead.company}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white"
                >
                  {lead.status}
                </Badge>
                <div className="flex items-center gap-1 text-sm">
                  <span className="font-semibold">Score:</span>
                  <span
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${getScoreColor(lead.score)} text-white font-bold`}
                  >
                    {lead.score}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => onSendMessage(lead.id)}
            >
              <MessageSquare className="mr-1 h-4 w-4" />
              Message
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => onEditLead(lead.id)}
            >
              <Edit className="mr-1 h-4 w-4" />
              Edit
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => onForwardToEmail(lead.id)}
            >
              <Mail className="mr-1 h-4 w-4" />
              Forward
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Tabs for different sections */}
      <Tabs
        defaultValue="overview"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid grid-cols-4 w-full rounded-none border-b">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="score">Score Analysis</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="p-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={activeTab === "overview" ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <span>{lead.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <span>{lead.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building className="h-5 w-5 text-muted-foreground" />
                    <span>{lead.company}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <span>{lead.position}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span>{lead.location}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Lead Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Tag className="h-5 w-5 text-muted-foreground" />
                    <span>Source: {lead.source}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span>Created: {formatDate(lead.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span>Last Contact: {formatDate(lead.lastContact)}</span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {lead.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Score Overview</CardTitle>
                  <CardDescription>
                    AI-generated lead qualification score
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`flex items-center justify-center w-16 h-16 rounded-full ${getScoreColor(lead.score)} text-white font-bold text-2xl`}
                    >
                      {lead.score}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">
                        {lead.score >= 80
                          ? "High-Quality Lead"
                          : lead.score >= 60
                            ? "Medium-Quality Lead"
                            : "Low-Quality Lead"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Based on engagement, intent signals, and profile data
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {scoreBreakdown.slice(0, 3).map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{item.category}</span>
                          <span className="font-medium">{item.score}/100</span>
                        </div>
                        <Progress value={item.score} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto"
                    onClick={() => setActiveTab("score")}
                  >
                    View Full Analysis
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="p-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={activeTab === "activity" ? "visible" : "hidden"}
          >
            <Card>
              <CardHeader>
                <CardTitle>Activity Timeline</CardTitle>
                <CardDescription>
                  Recent interactions and events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-muted before:ml-0.5">
                  {activities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      variants={itemVariants}
                      className="relative pl-8"
                    >
                      <div className="absolute left-0 top-1 w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                        <Activity className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{activity.description}</p>
                          <Badge variant="outline" className="text-xs">
                            {activity.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(activity.timestamp)} at{" "}
                          {formatTime(activity.timestamp)}
                        </p>
                      </div>
                      {index < activities.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages" className="p-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={activeTab === "messages" ? "visible" : "hidden"}
          >
            <Card>
              <CardHeader>
                <CardTitle>Message History</CardTitle>
                <CardDescription>Communication with this lead</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      variants={itemVariants}
                      className={`flex ${message.sender === "lead" ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.sender === "lead"
                            ? "bg-muted text-foreground"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        <p>{message.content}</p>
                        <p
                          className={`text-xs mt-2 ${message.sender === "lead" ? "text-muted-foreground" : "text-primary-foreground/80"}`}
                        >
                          {formatTime(message.timestamp)} ·{" "}
                          {formatDate(message.timestamp)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => onSendMessage(lead.id)}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send New Message
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Score Analysis Tab */}
        <TabsContent value="score" className="p-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={activeTab === "score" ? "visible" : "hidden"}
          >
            <Card>
              <CardHeader>
                <CardTitle>Detailed Score Analysis</CardTitle>
                <CardDescription>
                  AI-powered lead qualification breakdown
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center mb-8">
                  <div
                    className={`flex items-center justify-center w-24 h-24 rounded-full ${getScoreColor(lead.score)} text-white font-bold text-3xl`}
                  >
                    {lead.score}
                  </div>
                </div>

                <div className="space-y-6">
                  {scoreBreakdown.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{item.category}</h3>
                        <Badge
                          variant="outline"
                          className={`${item.score >= 80 ? "border-green-500 text-green-500" : item.score >= 60 ? "border-yellow-500 text-yellow-500" : "border-red-500 text-red-500"}`}
                        >
                          {item.score}/100
                        </Badge>
                      </div>
                      <Progress value={item.score} className="h-2" />
                      <p className="text-sm text-muted-foreground">
                        {item.category === "Engagement" &&
                          "Based on website visits, content interactions, and response rates."}
                        {item.category === "Intent" &&
                          "Derived from search terms, pages visited, and form submissions."}
                        {item.category === "Budget" &&
                          "Estimated from company size, industry benchmarks, and explicit indicators."}
                        {item.category === "Timeline" &&
                          "Assessed from urgency signals in communications and browsing patterns."}
                        {item.category === "Fit" &&
                          "Determined by matching company profile with ideal customer profile."}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => onEditLead(lead.id)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Adjust Scoring Parameters
                </Button>
                <Button onClick={() => onForwardToEmail(lead.id)}>
                  <Mail className="mr-2 h-4 w-4" />
                  Forward to Email Campaign
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default LeadDetail;

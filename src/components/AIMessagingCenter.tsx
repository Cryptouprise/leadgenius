import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Send,
  Plus,
  MessageSquare,
  Settings,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  content: string;
  sender: "ai" | "user" | "lead";
  timestamp: string;
  status?: "sent" | "delivered" | "read" | "failed";
}

interface Conversation {
  id: string;
  leadName: string;
  leadAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  status: "active" | "pending" | "closed";
  messages: Message[];
}

interface Template {
  id: string;
  name: string;
  content: string;
  category: string;
}

const AIMessagingCenter = () => {
  const [activeTab, setActiveTab] = useState("conversations");
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data
  const conversations: Conversation[] = [
    {
      id: "1",
      leadName: "Alex Johnson",
      leadAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      lastMessage: "I'm interested in learning more about your services.",
      lastMessageTime: "10:23 AM",
      unread: 2,
      status: "active",
      messages: [
        {
          id: "m1",
          content:
            "Hello, I saw your product online and I'm interested in learning more.",
          sender: "lead",
          timestamp: "10:20 AM",
          status: "read",
        },
        {
          id: "m2",
          content:
            "Hi Alex! Thanks for reaching out. I'd be happy to tell you more about our services. What specific features are you most interested in?",
          sender: "ai",
          timestamp: "10:21 AM",
          status: "read",
        },
        {
          id: "m3",
          content: "I'm interested in learning more about your services.",
          sender: "lead",
          timestamp: "10:23 AM",
          status: "read",
        },
      ],
    },
    {
      id: "2",
      leadName: "Sarah Miller",
      leadAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      lastMessage: "What are your pricing options?",
      lastMessageTime: "Yesterday",
      unread: 0,
      status: "active",
      messages: [
        {
          id: "m1",
          content: "Hi there, I'm wondering about your pricing structure.",
          sender: "lead",
          timestamp: "Yesterday, 3:45 PM",
          status: "read",
        },
        {
          id: "m2",
          content:
            "Hello Sarah! We offer several pricing tiers to fit different needs. Our basic plan starts at $49/month, while our premium plan is $99/month. Would you like me to send you a detailed breakdown?",
          sender: "ai",
          timestamp: "Yesterday, 3:47 PM",
          status: "read",
        },
        {
          id: "m3",
          content: "What are your pricing options?",
          sender: "lead",
          timestamp: "Yesterday, 4:02 PM",
          status: "read",
        },
      ],
    },
    {
      id: "3",
      leadName: "Michael Chen",
      leadAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      lastMessage: "Thanks for the information!",
      lastMessageTime: "2 days ago",
      unread: 0,
      status: "closed",
      messages: [
        {
          id: "m1",
          content: "I'd like to know more about your product features.",
          sender: "lead",
          timestamp: "2 days ago, 11:30 AM",
          status: "read",
        },
        {
          id: "m2",
          content:
            "Hi Michael! Our product includes advanced analytics, real-time notifications, and seamless integration with popular tools. Would you like me to elaborate on any specific feature?",
          sender: "ai",
          timestamp: "2 days ago, 11:35 AM",
          status: "read",
        },
        {
          id: "m3",
          content: "Thanks for the information!",
          sender: "lead",
          timestamp: "2 days ago, 11:42 AM",
          status: "read",
        },
      ],
    },
  ];

  const templates: Template[] = [
    {
      id: "t1",
      name: "Initial Outreach",
      content:
        "Hi {{name}}, thanks for your interest in our services! I'd love to learn more about your needs and how we can help. What specific challenges are you looking to solve?",
      category: "Outreach",
    },
    {
      id: "t2",
      name: "Follow-up",
      content:
        "Hello {{name}}, I wanted to follow up on our previous conversation. Have you had a chance to review the information I sent? I'm happy to answer any questions you might have.",
      category: "Follow-up",
    },
    {
      id: "t3",
      name: "Pricing Information",
      content:
        "Hi {{name}}, regarding your pricing inquiry, we offer several plans starting at $49/month for our basic tier. Our premium plan at $99/month includes additional features like advanced analytics and priority support. Would you like me to send you a detailed breakdown?",
      category: "Information",
    },
  ];

  const filteredConversations = conversations.filter(
    (convo) =>
      convo.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      convo.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const currentConversation =
    conversations.find((c) => c.id === selectedConversation) ||
    conversations[0];

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    // In a real app, this would send the message via API
    console.log("Sending message:", messageInput);
    setMessageInput("");
  };

  const handleUseTemplate = (templateContent: string) => {
    setMessageInput(templateContent);
  };

  return (
    <div className="w-full h-full bg-background p-4 rounded-xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col h-full"
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-primary">
            AI Messaging Center
          </h1>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        <Tabs
          defaultValue="conversations"
          className="flex-1 flex flex-col"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="conversations">
              <MessageSquare className="h-4 w-4 mr-2" />
              Conversations
            </TabsTrigger>
            <TabsTrigger value="templates">
              <Plus className="h-4 w-4 mr-2" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <Clock className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="conversations" className="flex-1 flex space-x-4">
            <div className="w-1/3 flex flex-col">
              <div className="mb-4 relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10"
                />
              </div>
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-2">
                  {filteredConversations.map((conversation) => (
                    <motion.div
                      key={conversation.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <Card
                        className={`cursor-pointer ${selectedConversation === conversation.id ? "border-primary" : ""}`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage
                                  src={conversation.leadAvatar}
                                  alt={conversation.leadName}
                                />
                                <AvatarFallback>
                                  {conversation.leadName.substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">
                                  {conversation.leadName}
                                </h3>
                                <p className="text-sm text-muted-foreground truncate max-w-[180px]">
                                  {conversation.lastMessage}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-xs text-muted-foreground">
                                {conversation.lastMessageTime}
                              </span>
                              {conversation.unread > 0 && (
                                <Badge variant="default" className="mt-1">
                                  {conversation.unread}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <div className="w-2/3 flex flex-col">
              {currentConversation && (
                <>
                  <Card className="flex-1 flex flex-col mb-4">
                    <CardHeader className="pb-2 border-b">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage
                              src={currentConversation.leadAvatar}
                              alt={currentConversation.leadName}
                            />
                            <AvatarFallback>
                              {currentConversation.leadName.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle>
                              {currentConversation.leadName}
                            </CardTitle>
                            <CardDescription>
                              <Badge
                                variant={
                                  currentConversation.status === "active"
                                    ? "default"
                                    : currentConversation.status === "pending"
                                      ? "secondary"
                                      : "outline"
                                }
                                className="mt-1"
                              >
                                {currentConversation.status
                                  .charAt(0)
                                  .toUpperCase() +
                                  currentConversation.status.slice(1)}
                              </Badge>
                            </CardDescription>
                          </div>
                        </div>
                        <div>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-auto py-4">
                      <ScrollArea className="h-[400px] pr-4">
                        <div className="space-y-4">
                          {currentConversation.messages.map((message) => (
                            <motion.div
                              key={message.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className={`flex ${message.sender !== "lead" ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`max-w-[70%] p-3 rounded-lg ${
                                  message.sender === "lead"
                                    ? "bg-muted text-foreground"
                                    : message.sender === "ai"
                                      ? "bg-primary text-primary-foreground"
                                      : "bg-secondary text-secondary-foreground"
                                }`}
                              >
                                <p>{message.content}</p>
                                <div className="flex items-center justify-end mt-1 space-x-1">
                                  <span className="text-xs opacity-70">
                                    {message.timestamp}
                                  </span>
                                  {message.sender !== "lead" && (
                                    <span>
                                      {message.status === "sent" && (
                                        <Clock className="h-3 w-3 opacity-70" />
                                      )}
                                      {message.status === "delivered" && (
                                        <CheckCircle className="h-3 w-3 opacity-70" />
                                      )}
                                      {message.status === "read" && (
                                        <CheckCircle className="h-3 w-3 opacity-70" />
                                      )}
                                      {message.status === "failed" && (
                                        <AlertCircle className="h-3 w-3 text-destructive" />
                                      )}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                    <CardFooter className="pt-4 border-t">
                      <div className="flex w-full space-x-2">
                        <Select>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select template" />
                          </SelectTrigger>
                          <SelectContent>
                            {templates.map((template) => (
                              <SelectItem
                                key={template.id}
                                value={template.id}
                                onClick={() =>
                                  handleUseTemplate(template.content)
                                }
                              >
                                {template.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Textarea
                          placeholder="Type your message here..."
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          className="flex-1"
                        />
                        <Button onClick={handleSendMessage}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((template) => (
                <motion.div
                  key={template.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>{template.name}</CardTitle>
                        <Badge>{template.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{template.content}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button size="sm">Use Template</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="border-dashed flex items-center justify-center h-full">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Create New Template</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Response Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">78%</div>
                  <p className="text-sm text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    Average Response Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">3.2h</div>
                  <p className="text-sm text-muted-foreground">
                    -0.5h from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">24%</div>
                  <p className="text-sm text-muted-foreground">
                    +5% from last month
                  </p>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Message Performance</CardTitle>
                <CardDescription>
                  Analytics for your AI-powered messages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Chart visualization would go here
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default AIMessagingCenter;

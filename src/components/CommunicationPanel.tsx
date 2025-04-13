import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Clock,
  Save,
  Sparkles,
  MessageSquare,
  History,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Message {
  id: string;
  content: string;
  sender: "user" | "lead";
  timestamp: Date;
}

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  score: number;
  avatar?: string;
}

interface CommunicationPanelProps {
  lead?: Lead;
  onSendMessage?: (message: string, leadId: string) => void;
  onScheduleMessage?: (message: string, leadId: string, date: Date) => void;
  onSaveTemplate?: (template: string, name: string) => void;
}

const CommunicationPanel: React.FC<CommunicationPanelProps> = ({
  lead = {
    id: "lead-1",
    name: "Alex Johnson",
    phone: "+1 (555) 123-4567",
    email: "alex.johnson@example.com",
    score: 85,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  onSendMessage = () => {},
  onScheduleMessage = () => {},
  onSaveTemplate = () => {},
}) => {
  const [message, setMessage] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [showSaveTemplate, setShowSaveTemplate] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [scheduleDate, setScheduleDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState("compose");

  // Mock data
  const messageHistory: Message[] = [
    {
      id: "1",
      content:
        "Hi there! I saw your inquiry about our product. How can I help you today?",
      sender: "user",
      timestamp: new Date(Date.now() - 86400000),
    },
    {
      id: "2",
      content: "Yes, I'm interested in learning more about your pricing plans.",
      sender: "lead",
      timestamp: new Date(Date.now() - 82800000),
    },
    {
      id: "3",
      content:
        "Great! Our plans start at $49/month for the basic package. Would you like me to send you our full pricing guide?",
      sender: "user",
      timestamp: new Date(Date.now() - 79200000),
    },
    {
      id: "4",
      content:
        "That would be helpful. Also, do you offer any discounts for annual subscriptions?",
      sender: "lead",
      timestamp: new Date(Date.now() - 43200000),
    },
  ];

  const aiSuggestions = [
    "Would you like to schedule a demo to see our product in action?",
    "Based on your needs, our Enterprise plan might be the best fit. It includes all features plus dedicated support.",
    "We're currently offering a 20% discount for annual subscriptions. Would you be interested in that option?",
    "I'd be happy to connect you with one of our product specialists who can answer all your technical questions.",
  ];

  const templates = [
    {
      id: "1",
      name: "Initial Follow-up",
      content:
        "Hi {{name}}, thanks for your interest in our product. When would be a good time to discuss your needs?",
    },
    {
      id: "2",
      name: "Pricing Info",
      content:
        "Hello {{name}}, as requested, here's a link to our detailed pricing guide: [link]. Let me know if you have any questions!",
    },
    {
      id: "3",
      name: "Meeting Request",
      content:
        "Hi {{name}}, I'd like to schedule a quick call to discuss how we can help. Are you available this week?",
    },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message, lead.id);
      setMessage("");
    }
  };

  const handleScheduleMessage = () => {
    if (message.trim()) {
      onScheduleMessage(message, lead.id, scheduleDate);
      setMessage("");
      setShowScheduler(false);
    }
  };

  const handleSaveTemplate = () => {
    if (message.trim() && templateName.trim()) {
      onSaveTemplate(message, templateName);
      setTemplateName("");
      setShowSaveTemplate(false);
    }
  };

  const applyTemplate = (templateContent: string) => {
    let personalizedContent = templateContent;
    personalizedContent = personalizedContent.replace("{{name}}", lead.name);
    setMessage(personalizedContent);
  };

  const applySuggestion = (suggestion: string) => {
    setMessage(suggestion);
  };

  return (
    <Card className="w-full max-w-4xl bg-background border-primary/20 shadow-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-white/50">
              <AvatarImage src={lead.avatar} alt={lead.name} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {lead.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{lead.name}</CardTitle>
              <CardDescription className="text-white/80">
                {lead.phone} • {lead.email}
              </CardDescription>
            </div>
          </div>
          <Badge
            variant="outline"
            className="bg-white/10 text-white border-white/20 px-3 py-1"
          >
            Score: {lead.score}/100
          </Badge>
        </div>
      </CardHeader>

      <Tabs
        defaultValue="compose"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="w-full grid grid-cols-3 rounded-none bg-muted/50">
          <TabsTrigger
            value="compose"
            className="data-[state=active]:bg-background"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Compose
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="data-[state=active]:bg-background"
          >
            <History className="mr-2 h-4 w-4" />
            History
          </TabsTrigger>
          <TabsTrigger
            value="templates"
            className="data-[state=active]:bg-background"
          >
            <Save className="mr-2 h-4 w-4" />
            Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="p-0">
          <CardContent className="p-6">
            <div className="space-y-4">
              <Textarea
                placeholder="Type your message here..."
                className="min-h-[120px] resize-none border-primary/20 focus:border-primary"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              {showScheduler && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border rounded-md bg-muted/30"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Schedule Message</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowScheduler(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      type="datetime-local"
                      onChange={(e) =>
                        setScheduleDate(new Date(e.target.value))
                      }
                      className="flex-1"
                    />
                    <Button onClick={handleScheduleMessage}>Schedule</Button>
                  </div>
                </motion.div>
              )}

              {showSaveTemplate && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border rounded-md bg-muted/30"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Save as Template</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSaveTemplate(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Template name"
                      value={templateName}
                      onChange={(e) => setTemplateName(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleSaveTemplate}>Save</Button>
                  </div>
                </motion.div>
              )}

              <div className="space-y-3">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  AI Suggestions
                </h3>
                <div className="flex flex-wrap gap-2">
                  {aiSuggestions.map((suggestion, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-left h-auto py-2 border-primary/20 hover:bg-primary/5"
                        onClick={() => applySuggestion(suggestion)}
                      >
                        {suggestion.length > 60
                          ? `${suggestion.substring(0, 60)}...`
                          : suggestion}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between border-t p-4 bg-muted/10">
            <div className="flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setShowSaveTemplate(true)}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Save as template</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Insert variable" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="company">Company</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowScheduler(true)}>
                <Clock className="mr-2 h-4 w-4" />
                Schedule
              </Button>
              <Button onClick={handleSendMessage}>
                <Send className="mr-2 h-4 w-4" />
                Send
              </Button>
            </div>
          </CardFooter>
        </TabsContent>

        <TabsContent value="history" className="p-0">
          <CardContent className="p-6 max-h-[400px] overflow-y-auto">
            <div className="space-y-4">
              {messageHistory.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p>{msg.content}</p>
                    <p
                      className={`text-xs mt-1 ${msg.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                    >
                      {msg.timestamp.toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t p-4 bg-muted/10">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setActiveTab("compose")}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Reply
            </Button>
          </CardFooter>
        </TabsContent>

        <TabsContent value="templates" className="p-0">
          <CardContent className="p-6">
            <div className="space-y-4">
              {templates.map((template) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border rounded-md hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => {
                    applyTemplate(template.content);
                    setActiveTab("compose");
                  }}
                >
                  <h3 className="font-medium mb-2">{template.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {template.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t p-4 bg-muted/10">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setShowSaveTemplate(true);
                setActiveTab("compose");
              }}
            >
              <Save className="mr-2 h-4 w-4" />
              Create New Template
            </Button>
          </CardFooter>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default CommunicationPanel;

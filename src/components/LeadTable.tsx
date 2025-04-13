import React, { useState } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  MessageSquare,
  Edit,
  Send,
  Star,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  score: number;
  status: "New" | "Contacted" | "Qualified" | "Converted" | "Lost";
  source: string;
  lastActivity: string;
  tags: string[];
  avatar?: string;
}

interface LeadTableProps {
  leads?: Lead[];
  onEditLead?: (lead: Lead) => void;
  onViewLead?: (lead: Lead) => void;
  onMessageLead?: (lead: Lead) => void;
  onForwardLead?: (lead: Lead) => void;
}

const defaultLeads: Lead[] = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    phone: "(555) 123-4567",
    company: "TechCorp",
    score: 92,
    status: "Qualified",
    source: "Website",
    lastActivity: "2 hours ago",
    tags: ["Enterprise", "High Budget"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah@example.com",
    phone: "(555) 987-6543",
    company: "Marketing Pro",
    score: 78,
    status: "Contacted",
    source: "LinkedIn",
    lastActivity: "1 day ago",
    tags: ["Mid-Market", "Urgent"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael@example.com",
    phone: "(555) 456-7890",
    company: "Global Solutions",
    score: 95,
    status: "New",
    source: "Referral",
    lastActivity: "30 minutes ago",
    tags: ["Enterprise", "International"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  },
  {
    id: "4",
    name: "Jessica Lee",
    email: "jessica@example.com",
    phone: "(555) 789-0123",
    company: "Startup Inc",
    score: 65,
    status: "Contacted",
    source: "Webinar",
    lastActivity: "3 days ago",
    tags: ["Startup", "Limited Budget"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
  },
  {
    id: "5",
    name: "David Rodriguez",
    email: "david@example.com",
    phone: "(555) 234-5678",
    company: "Innovate LLC",
    score: 88,
    status: "Qualified",
    source: "Trade Show",
    lastActivity: "5 hours ago",
    tags: ["Mid-Market", "Technical"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
  },
];

const LeadTable: React.FC<LeadTableProps> = ({
  leads = defaultLeads,
  onEditLead = () => {},
  onViewLead = () => {},
  onMessageLead = () => {},
  onForwardLead = () => {},
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Lead>("score");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedTab, setSelectedTab] = useState("all");

  const handleSort = (field: keyof Lead) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const filteredLeads = leads.filter((lead) => {
    // Filter by search term
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by tab
    const matchesTab =
      selectedTab === "all" ||
      (selectedTab === "new" && lead.status === "New") ||
      (selectedTab === "contacted" && lead.status === "Contacted") ||
      (selectedTab === "qualified" && lead.status === "Qualified") ||
      (selectedTab === "converted" && lead.status === "Converted");

    return matchesSearch && matchesTab;
  });

  const sortedLeads = [...filteredLeads].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 70) return "bg-blue-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getStatusColor = (status: Lead["status"]) => {
    switch (status) {
      case "New":
        return "bg-purple-500";
      case "Contacted":
        return "bg-blue-500";
      case "Qualified":
        return "bg-green-500";
      case "Converted":
        return "bg-emerald-500";
      case "Lost":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="w-full bg-background border-none shadow-lg overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              Lead Management
            </h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
              <Button variant="default" size="sm">
                <Star className="h-4 w-4 mr-2" />
                AI Qualify
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search leads by name, email, or company..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Tabs
            defaultValue="all"
            value={selectedTab}
            onValueChange={setSelectedTab}
          >
            <TabsList className="grid grid-cols-5 w-full max-w-md">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="contacted">Contacted</TabsTrigger>
              <TabsTrigger value="qualified">Qualified</TabsTrigger>
              <TabsTrigger value="converted">Converted</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    Lead
                    {sortField === "name" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => handleSort("company")}
                  >
                    Company
                    {sortField === "company" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => handleSort("status")}
                  >
                    Status
                    {sortField === "status" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => handleSort("score")}
                  >
                    Score
                    {sortField === "score" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => handleSort("lastActivity")}
                  >
                    Last Activity
                    {sortField === "lastActivity" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Tags
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedLeads.map((lead) => (
                <motion.tr
                  key={lead.id}
                  className="border-b border-border hover:bg-muted/50 cursor-pointer"
                  onClick={() => onViewLead(lead)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={lead.avatar} alt={lead.name} />
                        <AvatarFallback>{lead.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{lead.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {lead.email}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {lead.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-medium">{lead.company}</div>
                    <div className="text-sm text-muted-foreground">
                      {lead.source}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Badge
                      className={`${getStatusColor(lead.status)} text-white`}
                    >
                      {lead.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="font-medium">{lead.score}</div>
                      <Progress
                        value={lead.score}
                        className="w-24 h-2"
                        style={{ backgroundColor: getScoreColor(lead.score) }}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm">{lead.lastActivity}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {lead.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div
                      className="flex items-center space-x-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onMessageLead(lead)}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEditLead(lead)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onForwardLead(lead)}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Add to Campaign</DropdownMenuItem>
                          <DropdownMenuItem>
                            Schedule Follow-up
                          </DropdownMenuItem>
                          <DropdownMenuItem>Mark as Lost</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadTable;

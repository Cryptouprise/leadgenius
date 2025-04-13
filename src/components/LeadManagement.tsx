import React, { useState } from "react";
import {
  Search,
  Filter,
  Tag,
  Download,
  Mail,
  Trash,
  MoreHorizontal,
  Plus,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  score: number;
  status: "New" | "Contacted" | "Qualified" | "Converted" | "Lost";
  source: string;
  tags: string[];
  lastActivity: string;
}

const LeadManagement = () => {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [showCreateSegment, setShowCreateSegment] = useState(false);

  // Mock data for leads
  const mockLeads: Lead[] = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      score: 85,
      status: "Qualified",
      source: "Website",
      tags: ["High Intent", "Product Demo"],
      lastActivity: "2 hours ago",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+1 (555) 987-6543",
      score: 92,
      status: "New",
      source: "LinkedIn",
      tags: ["High Intent", "Decision Maker"],
      lastActivity: "5 hours ago",
    },
    {
      id: "3",
      name: "Michael Chen",
      email: "michael.c@example.com",
      phone: "+1 (555) 456-7890",
      score: 78,
      status: "Contacted",
      source: "Referral",
      tags: ["Medium Intent"],
      lastActivity: "1 day ago",
    },
    {
      id: "4",
      name: "Emily Rodriguez",
      email: "emily.r@example.com",
      phone: "+1 (555) 234-5678",
      score: 65,
      status: "New",
      source: "Website",
      tags: ["Medium Intent", "Needs Follow-up"],
      lastActivity: "3 days ago",
    },
    {
      id: "5",
      name: "David Kim",
      email: "david.k@example.com",
      phone: "+1 (555) 876-5432",
      score: 95,
      status: "Qualified",
      source: "Trade Show",
      tags: ["High Intent", "Budget Holder"],
      lastActivity: "6 hours ago",
    },
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedLeads(mockLeads.map((lead) => lead.id));
    } else {
      setSelectedLeads([]);
    }
  };

  const handleSelectLead = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedLeads([...selectedLeads, id]);
    } else {
      setSelectedLeads(selectedLeads.filter((leadId) => leadId !== id));
    }
  };

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-background p-6 rounded-xl w-full"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Lead Management</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setShowCreateSegment(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Segment
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Lead
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search leads..." className="pl-10" />
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline">
                <Tag className="h-4 w-4 mr-2" />
                Tags
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <ChevronDown className="h-4 w-4 mr-2" />
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Newest First</DropdownMenuItem>
                  <DropdownMenuItem>Oldest First</DropdownMenuItem>
                  <DropdownMenuItem>Highest Score</DropdownMenuItem>
                  <DropdownMenuItem>Lowest Score</DropdownMenuItem>
                  <DropdownMenuItem>A-Z</DropdownMenuItem>
                  <DropdownMenuItem>Z-A</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Leads</TabsTrigger>
          <TabsTrigger value="high-intent">High Intent</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="contacted">Contacted</TabsTrigger>
          <TabsTrigger value="qualified">Qualified</TabsTrigger>
          <TabsTrigger value="saved">Saved Segments</TabsTrigger>
        </TabsList>

        {["all", "high-intent", "new", "contacted", "qualified", "saved"].map(
          (tab) => (
            <TabsContent key={tab} value={tab} className="space-y-4">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">
                      {tab === "all"
                        ? "All Leads"
                        : tab === "high-intent"
                          ? "High Intent Leads"
                          : tab === "new"
                            ? "New Leads"
                            : tab === "contacted"
                              ? "Contacted Leads"
                              : tab === "qualified"
                                ? "Qualified Leads"
                                : "Saved Segments"}
                    </CardTitle>
                    {selectedLeads.length > 0 && (
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Mail className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="p-3 text-left">
                            <Checkbox
                              checked={
                                selectedLeads.length === mockLeads.length
                              }
                              onCheckedChange={(checked) =>
                                handleSelectAll(!!checked)
                              }
                            />
                          </th>
                          <th className="p-3 text-left font-medium">Name</th>
                          <th className="p-3 text-left font-medium">Email</th>
                          <th className="p-3 text-left font-medium">Phone</th>
                          <th className="p-3 text-left font-medium">Score</th>
                          <th className="p-3 text-left font-medium">Status</th>
                          <th className="p-3 text-left font-medium">Source</th>
                          <th className="p-3 text-left font-medium">Tags</th>
                          <th className="p-3 text-left font-medium">
                            Last Activity
                          </th>
                          <th className="p-3 text-left font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockLeads.map((lead) => (
                          <motion.tr
                            key={lead.id}
                            className="border-b hover:bg-muted/50 transition-colors"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <td className="p-3">
                              <Checkbox
                                checked={selectedLeads.includes(lead.id)}
                                onCheckedChange={(checked) =>
                                  handleSelectLead(lead.id, !!checked)
                                }
                              />
                            </td>
                            <td className="p-3 font-medium">{lead.name}</td>
                            <td className="p-3">{lead.email}</td>
                            <td className="p-3">{lead.phone}</td>
                            <td className="p-3">
                              <div className="flex items-center">
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium ${getScoreColor(lead.score)}`}
                                >
                                  {lead.score}
                                </div>
                              </div>
                            </td>
                            <td className="p-3">
                              <Badge
                                variant="outline"
                                className={`${getStatusColor(lead.status)} text-white`}
                              >
                                {lead.status}
                              </Badge>
                            </td>
                            <td className="p-3">{lead.source}</td>
                            <td className="p-3">
                              <div className="flex flex-wrap gap-1">
                                {lead.tags.map((tag, index) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </td>
                            <td className="p-3">{lead.lastActivity}</td>
                            <td className="p-3">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>Edit Lead</DropdownMenuItem>
                                  <DropdownMenuItem>
                                    Send Message
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>Add Tags</DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ),
        )}
      </Tabs>

      <Dialog open={showCreateSegment} onOpenChange={setShowCreateSegment}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Lead Segment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Segment Name</label>
              <Input placeholder="Enter segment name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input placeholder="Enter segment description" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Filter Criteria</label>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                    <option>Score</option>
                    <option>Status</option>
                    <option>Source</option>
                    <option>Tags</option>
                  </select>
                  <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                    <option>is greater than</option>
                    <option>is less than</option>
                    <option>equals</option>
                    <option>contains</option>
                  </select>
                  <Input placeholder="Value" />
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Condition
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowCreateSegment(false)}
            >
              Cancel
            </Button>
            <Button>Create Segment</Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default LeadManagement;

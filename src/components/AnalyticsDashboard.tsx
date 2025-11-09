import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  PhoneCall,
  Mail,
  Calendar,
  Download,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  trend,
  icon,
}) => {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-slate-400 mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-white mb-2">{value}</h3>
            <div className="flex items-center">
              {trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
              )}
              <span
                className={`text-sm ${trend === "up" ? "text-green-400" : "text-red-400"}`}
              >
                {change}
              </span>
              <span className="text-sm text-slate-400 ml-1">vs last period</span>
            </div>
          </div>
          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [chartType, setChartType] = useState("overview");

  // Mock data for charts
  const leadsBySource = [
    { source: "Website", count: 450, percentage: 35 },
    { source: "LinkedIn", count: 320, percentage: 25 },
    { source: "Referral", count: 280, percentage: 22 },
    { source: "Email Campaign", count: 150, percentage: 12 },
    { source: "Other", count: 80, percentage: 6 },
  ];

  const conversionFunnel = [
    { stage: "New Leads", count: 1248, percentage: 100 },
    { stage: "Contacted", count: 856, percentage: 69 },
    { stage: "Qualified", count: 426, percentage: 34 },
    { stage: "Proposal Sent", count: 198, percentage: 16 },
    { stage: "Converted", count: 89, percentage: 7 },
  ];

  const weeklyTrend = [
    { day: "Mon", leads: 42, conversions: 8 },
    { day: "Tue", leads: 58, conversions: 12 },
    { day: "Wed", leads: 48, conversions: 9 },
    { day: "Thu", leads: 65, conversions: 15 },
    { day: "Fri", leads: 52, conversions: 11 },
    { day: "Sat", leads: 28, conversions: 5 },
    { day: "Sun", leads: 22, conversions: 3 },
  ];

  const handleExport = (format: string) => {
    console.log(`Exporting analytics as ${format}`);
    // In a real app, this would generate and download the report
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
            <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
            <p className="text-slate-400">
              Track your lead performance and conversion metrics
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px] bg-slate-800 border-slate-700">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="bg-slate-800 border-slate-700"
              onClick={() => handleExport("csv")}
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Total Leads"
            value="1,248"
            change="+12.5%"
            trend="up"
            icon={<Users className="h-6 w-6 text-blue-400" />}
          />
          <MetricCard
            title="Conversion Rate"
            value="24.8%"
            change="+5.2%"
            trend="up"
            icon={<TrendingUp className="h-6 w-6 text-green-400" />}
          />
          <MetricCard
            title="Revenue Generated"
            value="$48.2K"
            change="+18.3%"
            trend="up"
            icon={<DollarSign className="h-6 w-6 text-purple-400" />}
          />
          <MetricCard
            title="Avg Response Time"
            value="42 min"
            change="-15.8%"
            trend="up"
            icon={<PhoneCall className="h-6 w-6 text-amber-400" />}
          />
        </div>

        {/* Charts Section */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-slate-800/50 border border-slate-700 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="funnel">Conversion Funnel</TabsTrigger>
            <TabsTrigger value="sources">Lead Sources</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Trend Chart */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Weekly Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyTrend.map((day, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">{day.day}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-blue-400">{day.leads} leads</span>
                            <span className="text-green-400">
                              {day.conversions} conversions
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div
                            className="h-2 rounded-full bg-blue-500"
                            style={{
                              width: `${(day.leads / 70) * 100}%`,
                            }}
                          />
                          <div
                            className="h-2 rounded-full bg-green-500"
                            style={{
                              width: `${(day.conversions / 15) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Lead Status Distribution */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Lead Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { status: "New", count: 426, color: "bg-blue-500" },
                      { status: "Contacted", count: 312, color: "bg-purple-500" },
                      { status: "Qualified", count: 268, color: "bg-green-500" },
                      { status: "Proposal Sent", count: 156, color: "bg-amber-500" },
                      { status: "Converted", count: 86, color: "bg-emerald-500" },
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-300">{item.status}</span>
                          <span className="text-white font-medium">{item.count}</span>
                        </div>
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${item.color} rounded-full`}
                            style={{
                              width: `${(item.count / 426) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Activity Timeline */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      action: "New lead captured",
                      details: "Sarah Johnson from TechCorp",
                      time: "5 minutes ago",
                      icon: <Users className="h-4 w-4" />,
                      color: "text-blue-400",
                    },
                    {
                      action: "Email sent",
                      details: "Welcome email to 15 new leads",
                      time: "1 hour ago",
                      icon: <Mail className="h-4 w-4" />,
                      color: "text-purple-400",
                    },
                    {
                      action: "Call completed",
                      details: "Michael Chen - 15 min call",
                      time: "2 hours ago",
                      icon: <PhoneCall className="h-4 w-4" />,
                      color: "text-green-400",
                    },
                    {
                      action: "Lead qualified",
                      details: "Alex Rodriguez moved to Qualified",
                      time: "3 hours ago",
                      icon: <TrendingUp className="h-4 w-4" />,
                      color: "text-amber-400",
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-700/30 transition-colors"
                    >
                      <div
                        className={`h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center ${activity.color}`}
                      >
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{activity.action}</p>
                        <p className="text-sm text-slate-400">{activity.details}</p>
                      </div>
                      <span className="text-xs text-slate-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Conversion Funnel Tab */}
          <TabsContent value="funnel">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Conversion Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {conversionFunnel.map((stage, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300 font-medium">
                          {stage.stage}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-white font-bold">{stage.count}</span>
                          <span className="text-slate-400 text-sm">
                            ({stage.percentage}%)
                          </span>
                        </div>
                      </div>
                      <div className="relative h-12 bg-slate-700/50 rounded-lg overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600"
                          initial={{ width: 0 }}
                          animate={{ width: `${stage.percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                        <div className="absolute inset-0 flex items-center px-4">
                          <span className="text-white font-medium">
                            {stage.percentage}% of total leads
                          </span>
                        </div>
                      </div>
                      {index < conversionFunnel.length - 1 && (
                        <div className="flex items-center justify-center py-2">
                          <TrendingDown className="h-5 w-5 text-slate-500" />
                          <span className="text-xs text-slate-500 ml-2">
                            {(
                              ((stage.count - conversionFunnel[index + 1].count) /
                                stage.count) *
                              100
                            ).toFixed(1)}
                            % drop-off
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Lead Sources Tab */}
          <TabsContent value="sources">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Lead Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {leadsBySource.map((source, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center">
                            <span className="text-xl">{source.source[0]}</span>
                          </div>
                          <div>
                            <p className="text-white font-medium">{source.source}</p>
                            <p className="text-sm text-slate-400">
                              {source.count} leads
                            </p>
                          </div>
                        </div>
                        <span className="text-white font-bold">
                          {source.percentage}%
                        </span>
                      </div>
                      <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${source.percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">
                    Response Rate Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { week: "Week 1", rate: 65, change: "+2%" },
                      { week: "Week 2", rate: 68, change: "+3%" },
                      { week: "Week 3", rate: 72, change: "+4%" },
                      { week: "Week 4", rate: 75, change: "+3%" },
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-300">{item.week}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">
                              {item.rate}%
                            </span>
                            <span className="text-green-400 text-sm">
                              {item.change}
                            </span>
                          </div>
                        </div>
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${item.rate}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">
                    Revenue Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { month: "January", amount: "$38.2K" },
                      { month: "February", amount: "$42.5K" },
                      { month: "March", amount: "$45.8K" },
                      { month: "April", amount: "$48.2K" },
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-300">{item.month}</span>
                          <span className="text-white font-medium">
                            {item.amount}
                          </span>
                        </div>
                        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"
                            style={{
                              width: `${((index + 1) / 4) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default AnalyticsDashboard;

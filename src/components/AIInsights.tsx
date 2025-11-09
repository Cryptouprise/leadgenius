import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  Users,
  AlertCircle,
  Lightbulb,
  Target,
  MessageSquare,
  Calendar,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Insight {
  id: string;
  type: "opportunity" | "warning" | "suggestion" | "trend";
  title: string;
  description: string;
  actionable: boolean;
  impact: "high" | "medium" | "low";
  timestamp: string;
}

const AIInsights = () => {
  const [activeTab, setActiveTab] = useState("all");

  const insights: Insight[] = [
    {
      id: "1",
      type: "opportunity",
      title: "High-Value Lead Surge Detected",
      description:
        "15 new leads with scores above 85 have been added in the last 24 hours. These leads show strong buying intent and should be prioritized for immediate contact.",
      actionable: true,
      impact: "high",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      type: "warning",
      title: "Response Rate Declining",
      description:
        "Your team's response rate has dropped by 12% this week. Leads are waiting an average of 3.5 hours for initial contact, compared to 1.8 hours last week.",
      actionable: true,
      impact: "high",
      timestamp: "4 hours ago",
    },
    {
      id: "3",
      type: "suggestion",
      title: "Optimize Outreach Timing",
      description:
        "Analysis shows that leads contacted between 10 AM - 12 PM have a 35% higher conversion rate. Consider scheduling more outreach during these hours.",
      actionable: true,
      impact: "medium",
      timestamp: "1 day ago",
    },
    {
      id: "4",
      type: "trend",
      title: "LinkedIn Leads Converting Better",
      description:
        "LinkedIn-sourced leads have a 42% conversion rate this month, up from 28% last month. Consider increasing LinkedIn ad spend.",
      actionable: true,
      impact: "medium",
      timestamp: "1 day ago",
    },
    {
      id: "5",
      type: "opportunity",
      title: "Re-engagement Opportunity",
      description:
        "28 leads haven't been contacted in over 30 days but showed high intent initially. A re-engagement campaign could recover potential deals.",
      actionable: true,
      impact: "medium",
      timestamp: "2 days ago",
    },
    {
      id: "6",
      type: "suggestion",
      title: "Personalization Boosts Responses",
      description:
        "Messages with personalized subject lines get 2.5x more responses. AI can help generate personalized openers based on lead data.",
      actionable: true,
      impact: "low",
      timestamp: "3 days ago",
    },
  ];

  const getInsightIcon = (type: Insight["type"]) => {
    switch (type) {
      case "opportunity":
        return <Target className="h-5 w-5 text-green-400" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-red-400" />;
      case "suggestion":
        return <Lightbulb className="h-5 w-5 text-amber-400" />;
      case "trend":
        return <TrendingUp className="h-5 w-5 text-blue-400" />;
    }
  };

  const getInsightColor = (type: Insight["type"]) => {
    switch (type) {
      case "opportunity":
        return "from-green-500/20 to-green-600/20 border-green-500/30";
      case "warning":
        return "from-red-500/20 to-red-600/20 border-red-500/30";
      case "suggestion":
        return "from-amber-500/20 to-amber-600/20 border-amber-500/30";
      case "trend":
        return "from-blue-500/20 to-blue-600/20 border-blue-500/30";
    }
  };

  const getImpactBadge = (impact: Insight["impact"]) => {
    const colors = {
      high: "bg-red-500/20 text-red-400 border-red-500/30",
      medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      low: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    };
    return colors[impact];
  };

  const filteredInsights =
    activeTab === "all"
      ? insights
      : insights.filter((insight) => insight.type === activeTab);

  // AI Recommendations
  const recommendations = [
    {
      icon: <MessageSquare className="h-5 w-5 text-purple-400" />,
      title: "Send Follow-up Campaign",
      description: "To 45 qualified leads who haven't responded",
      action: "Create Campaign",
    },
    {
      icon: <Calendar className="h-5 w-5 text-blue-400" />,
      title: "Schedule Team Training",
      description: "On new AI-powered qualification techniques",
      action: "Schedule",
    },
    {
      icon: <Zap className="h-5 w-5 text-amber-400" />,
      title: "Automate Routine Tasks",
      description: "Save 8 hours/week with workflow automation",
      action: "Set Up",
    },
  ];

  return (
    <div className="w-full space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">AI Insights</h1>
              <p className="text-slate-400">
                Intelligent recommendations powered by machine learning
              </p>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-600">
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            {
              label: "Total Insights",
              value: insights.length.toString(),
              color: "from-purple-500 to-purple-600",
            },
            {
              label: "High Priority",
              value: insights.filter((i) => i.impact === "high").length.toString(),
              color: "from-red-500 to-red-600",
            },
            {
              label: "Actionable",
              value: insights.filter((i) => i.actionable).length.toString(),
              color: "from-green-500 to-green-600",
            },
            {
              label: "This Week",
              value: "12",
              color: "from-blue-500 to-blue-600",
            },
          ].map((stat, index) => (
            <Card
              key={index}
              className="bg-slate-800/50 border-slate-700"
            >
              <CardContent className="p-4">
                <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Recommendations Section */}
        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border-purple-500/30 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              Recommended Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="h-10 w-10 rounded-lg bg-slate-700 flex items-center justify-center">
                      {rec.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">
                        {rec.title}
                      </h3>
                      <p className="text-sm text-slate-400">{rec.description}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600"
                  >
                    {rec.action}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Insights Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-slate-800/50 border border-slate-700 mb-6">
            <TabsTrigger value="all">All Insights</TabsTrigger>
            <TabsTrigger value="opportunity">Opportunities</TabsTrigger>
            <TabsTrigger value="warning">Warnings</TabsTrigger>
            <TabsTrigger value="suggestion">Suggestions</TabsTrigger>
            <TabsTrigger value="trend">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredInsights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card
                  className={`bg-gradient-to-br ${getInsightColor(insight.type)} border`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="h-10 w-10 rounded-lg bg-slate-800/50 flex items-center justify-center mt-1">
                          {getInsightIcon(insight.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-white">
                              {insight.title}
                            </h3>
                            <Badge
                              variant="outline"
                              className={`${getImpactBadge(insight.impact)} border`}
                            >
                              {insight.impact.toUpperCase()} IMPACT
                            </Badge>
                          </div>
                          <p className="text-slate-300 mb-3">
                            {insight.description}
                          </p>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-slate-400">
                              {insight.timestamp}
                            </span>
                            {insight.actionable && (
                              <Badge
                                variant="outline"
                                className="bg-green-500/20 text-green-400 border-green-500/30"
                              >
                                Actionable
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {insight.actionable && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-blue-500 to-purple-600"
                        >
                          Take Action
                        </Button>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default AIInsights;

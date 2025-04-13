import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bell,
  Settings,
  User,
  Menu,
  Mic,
  Volume2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LeadOverview from "@/components/LeadOverview";
import LeadManagement from "@/components/LeadManagement";
import AIMessagingCenter from "@/components/AIMessagingCenter";
import IntegrationHub from "@/components/IntegrationHub";
import VoiceAI from "@/components/VoiceAI";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Show loading when changing sections
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [activeSection]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleNavigation = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden">
      {/* Sidebar */}
      <motion.div
        className={`h-full bg-slate-800 border-r border-slate-700 flex flex-col transition-all duration-300 ease-in-out ${isSidebarCollapsed ? "w-20" : "w-64"}`}
        initial={{ x: -10, opacity: 0.8 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`flex items-center ${isSidebarCollapsed ? "justify-center w-full" : ""}`}
          >
            {!isSidebarCollapsed && (
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                Lead Genius
              </span>
            )}
            {isSidebarCollapsed && (
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                LG
              </span>
            )}
          </motion.div>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-5 w-5 text-slate-400" />
          </Button>
        </div>

        <div className="flex-1 py-6 flex flex-col gap-2">
          <NavItem
            icon="home"
            label="Dashboard"
            isActive={activeSection === "dashboard"}
            collapsed={isSidebarCollapsed}
            onClick={() => handleNavigation("dashboard")}
          />
          <NavItem
            icon="users"
            label="Leads"
            isActive={activeSection === "leads"}
            collapsed={isSidebarCollapsed}
            onClick={() => handleNavigation("leads")}
          />
          <NavItem
            icon="message-square"
            label="Messaging"
            isActive={activeSection === "messaging"}
            collapsed={isSidebarCollapsed}
            onClick={() => handleNavigation("messaging")}
          />
          <NavItem
            icon="bar-chart"
            label="Analytics"
            isActive={activeSection === "analytics"}
            collapsed={isSidebarCollapsed}
            onClick={() => handleNavigation("analytics")}
          />
          <NavItem
            icon="plug"
            label="Integrations"
            isActive={activeSection === "integrations"}
            collapsed={isSidebarCollapsed}
            onClick={() => handleNavigation("integrations")}
          />
          <NavItem
            icon="settings"
            label="Settings"
            isActive={activeSection === "settings"}
            collapsed={isSidebarCollapsed}
            onClick={() => handleNavigation("settings")}
          />
          <NavItem
            icon="voice"
            label="Voice AI"
            isActive={activeSection === "voice"}
            collapsed={isSidebarCollapsed}
            onClick={() => handleNavigation("voice")}
          />
        </div>

        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            {!isSidebarCollapsed && (
              <div>
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-slate-400">admin@leadgenius.com</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-slate-700 flex items-center justify-between px-6">
          <div>
            <h1 className="text-xl font-semibold">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h1>
            <p className="text-sm text-slate-400">Welcome back, Admin</p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="relative bg-slate-700 border-slate-600 hover:bg-slate-600"
            >
              <Bell className="h-5 w-5 text-white" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center">
                3
              </span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-slate-700 border-slate-600 hover:bg-slate-600"
            >
              <Settings className="h-5 w-5 text-white" />
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
          ) : (
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="bg-slate-800/50 border-slate-700 mb-6">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <StatCard
                      title="Total Leads"
                      value="1,248"
                      change="+12%"
                      isPositive={true}
                      color="from-blue-500 to-blue-600"
                    />
                    <StatCard
                      title="High Intent"
                      value="426"
                      change="+18%"
                      isPositive={true}
                      color="from-purple-500 to-purple-600"
                    />
                    <StatCard
                      title="Conversion Rate"
                      value="24.8%"
                      change="+5%"
                      isPositive={true}
                      color="from-green-500 to-green-600"
                    />
                    <StatCard
                      title="Response Rate"
                      value="68%"
                      change="-2%"
                      isPositive={false}
                      color="from-amber-500 to-amber-600"
                    />
                  </div>
                </CardContent>
              </Card>

              {activeSection === "dashboard" && (
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="mb-6 bg-slate-800/50 border border-slate-700">
                    <TabsTrigger value="overview">Lead Overview</TabsTrigger>
                    <TabsTrigger value="management">
                      Lead Management
                    </TabsTrigger>
                    <TabsTrigger value="messaging">AI Messaging</TabsTrigger>
                    <TabsTrigger value="integrations">Integrations</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview">
                    <LeadOverview />
                  </TabsContent>

                  <TabsContent value="management">
                    <LeadManagement />
                  </TabsContent>

                  <TabsContent value="messaging">
                    <AIMessagingCenter />
                  </TabsContent>

                  <TabsContent value="integrations">
                    <IntegrationHub />
                  </TabsContent>
                </Tabs>
              )}

              {activeSection === "leads" && <LeadManagement />}

              {activeSection === "messaging" && <AIMessagingCenter />}

              {activeSection === "integrations" && <IntegrationHub />}

              {activeSection === "voice" && <VoiceAI />}
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

const NavItem = ({
  icon,
  label,
  isActive,
  collapsed,
  onClick,
}: {
  icon: string;
  label: string;
  isActive: boolean;
  collapsed: boolean;
  onClick: () => void;
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "voice":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" x2="12" y1="19" y2="22" />
          </svg>
        );
      case "home":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        );
      case "users":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case "message-square":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        );
      case "bar-chart":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="20" x2="12" y2="10" />
            <line x1="18" y1="20" x2="18" y2="4" />
            <line x1="6" y1="20" x2="6" y2="16" />
          </svg>
        );
      case "plug":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22v-5" />
            <path d="M9 7V2" />
            <path d="M15 7V2" />
            <path d="M6 13V8h12v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4Z" />
          </svg>
        );
      case "settings":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        );
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`flex items-center px-4 py-3 cursor-pointer transition-colors ${isActive ? "bg-slate-700/50 text-white" : "text-slate-400 hover:bg-slate-700/30 hover:text-white"} ${collapsed ? "justify-center" : ""}`}
      onClick={onClick}
    >
      <div className={`${isActive ? "text-blue-400" : ""}`}>
        {getIcon(icon)}
      </div>
      {!collapsed && <span className="ml-3">{label}</span>}
    </div>
  );
};

const StatCard = ({
  title,
  value,
  change,
  isPositive,
  color,
}: {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  color: string;
}) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br opacity-10 rounded-bl-full"
        style={
          {
            background: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
            "--tw-gradient-from": color.split(" ")[0].split("-")[1],
            "--tw-gradient-to": color.split(" ")[1].split("-")[1],
          } as React.CSSProperties
        }
      ></div>
      <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold mt-1">{value}</p>
      <div
        className={`text-xs font-medium mt-2 inline-flex items-center ${isPositive ? "text-green-400" : "text-red-400"}`}
      >
        {isPositive ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 mr-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 mr-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        )}
        {change} from last month
      </div>
    </div>
  );
};

export default Dashboard;

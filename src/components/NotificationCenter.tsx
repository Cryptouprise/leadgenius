import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Check,
  X,
  AlertCircle,
  Info,
  CheckCircle,
  AlertTriangle,
  Trash2,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "success",
      title: "New Lead Added",
      message: "Sarah Johnson from TechCorp has been added to your pipeline",
      timestamp: new Date(Date.now() - 5 * 60000),
      read: false,
    },
    {
      id: "2",
      type: "warning",
      title: "Follow-up Required",
      message: "3 high-priority leads haven't been contacted in 48 hours",
      timestamp: new Date(Date.now() - 15 * 60000),
      read: false,
    },
    {
      id: "3",
      type: "info",
      title: "Weekly Report Ready",
      message: "Your weekly performance report is now available",
      timestamp: new Date(Date.now() - 60 * 60000),
      read: false,
    },
    {
      id: "4",
      type: "success",
      title: "Lead Converted",
      message: "Michael Chen has been marked as converted. Deal value: $12,500",
      timestamp: new Date(Date.now() - 2 * 60 * 60000),
      read: true,
    },
    {
      id: "5",
      type: "error",
      title: "Integration Error",
      message: "Failed to sync with Salesforce. Please check your API credentials",
      timestamp: new Date(Date.now() - 3 * 60 * 60000),
      read: true,
    },
    {
      id: "6",
      type: "info",
      title: "AI Insight Available",
      message: "New recommendations based on your lead behavior patterns",
      timestamp: new Date(Date.now() - 24 * 60 * 60000),
      read: true,
    },
  ]);

  const [activeTab, setActiveTab] = useState("all");

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-400" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-400" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-400" />;
    }
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications =
    activeTab === "all"
      ? notifications
      : activeTab === "unread"
        ? notifications.filter((n) => !n.read)
        : notifications.filter((n) => n.type === activeTab);

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: 400 }}
          animate={{ x: 0 }}
          exit={{ x: 400 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 h-full w-full max-w-md bg-slate-800 border-l border-slate-700 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Bell className="h-6 w-6 text-blue-400" />
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Notifications
                    </h2>
                    {unreadCount > 0 && (
                      <p className="text-sm text-slate-400">
                        {unreadCount} unread
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-slate-700"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={markAllAsRead}
                  className="flex-1 bg-slate-700 border-slate-600"
                  disabled={unreadCount === 0}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Mark all read
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={clearAll}
                  className="flex-1 bg-slate-700 border-slate-600"
                  disabled={notifications.length === 0}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear all
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="flex-1 flex flex-col"
            >
              <div className="px-6 pt-4 border-b border-slate-700">
                <TabsList className="bg-slate-700/50 w-full">
                  <TabsTrigger value="all" className="flex-1">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="unread" className="flex-1">
                    Unread
                    {unreadCount > 0 && (
                      <Badge
                        variant="outline"
                        className="ml-2 bg-blue-500/20 text-blue-400 border-blue-500/30"
                      >
                        {unreadCount}
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value={activeTab} className="flex-1 m-0">
                <ScrollArea className="h-full">
                  <div className="p-4 space-y-2">
                    {filteredNotifications.length === 0 ? (
                      <div className="text-center py-12">
                        <Bell className="h-12 w-12 mx-auto text-slate-600 mb-4" />
                        <p className="text-slate-400">No notifications</p>
                      </div>
                    ) : (
                      filteredNotifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 100 }}
                          className={`group relative ${!notification.read ? "bg-slate-700/50" : "bg-slate-800/50"} border border-slate-700 rounded-lg p-4 hover:bg-slate-700 transition-colors cursor-pointer`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 mt-1">
                              {getIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h3 className="text-sm font-semibold text-white">
                                  {notification.title}
                                </h3>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    {!notification.read && (
                                      <DropdownMenuItem
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          markAsRead(notification.id);
                                        }}
                                      >
                                        <Check className="mr-2 h-4 w-4" />
                                        Mark as read
                                      </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        deleteNotification(notification.id);
                                      }}
                                      className="text-red-400"
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                              <p className="text-sm text-slate-300 mb-2">
                                {notification.message}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-500">
                                  {getTimeAgo(notification.timestamp)}
                                </span>
                                {!notification.read && (
                                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NotificationCenter;

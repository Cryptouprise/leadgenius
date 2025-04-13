import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, MessageSquare, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <BarChart3 className="h-6 w-6 text-primary" />
            </motion.div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              Lead Genius
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Features
            </Button>
            <Button variant="ghost" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Pricing
            </Button>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={handleGetStarted}>
              Login
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              onClick={handleGetStarted}
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Hero Section */}
          <section className="py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <motion.h1
                  className="text-4xl md:text-5xl font-bold tracking-tight"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  AI-Powered Lead Management Platform
                </motion.h1>
                <motion.p
                  className="text-xl text-muted-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Qualify high-intent leads and automate follow-up with our
                  AI-powered platform.
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    onClick={handleGetStarted}
                  >
                    Start Free Trial
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleGetStarted}
                  >
                    Watch Demo
                  </Button>
                </motion.div>
              </div>
              <motion.div
                className="rounded-lg overflow-hidden shadow-2xl border border-border/50"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                  alt="Dashboard Preview"
                  className="w-full h-auto"
                />
              </motion.div>
            </div>
          </section>

          {/* Lead Management Preview Section */}
          <section className="py-12 bg-muted/20 rounded-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                Lead Management Dashboard
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Visualize and manage your leads with our intuitive dashboard
              </p>
            </div>

            <div className="max-w-6xl mx-auto bg-background rounded-xl shadow-xl border border-border/50 overflow-hidden">
              <div className="p-6 border-b border-border/50">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">High-Intent Leads</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Filter
                    </Button>
                    <Button size="sm">Add Lead</Button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {[
                    {
                      label: "Total Leads",
                      value: "1,248",
                      change: "+12%",
                      color: "text-blue-500",
                    },
                    {
                      label: "Conversion Rate",
                      value: "24.8%",
                      change: "+5%",
                      color: "text-green-500",
                    },
                    {
                      label: "Response Time",
                      value: "42m",
                      change: "-15%",
                      color: "text-green-500",
                    },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="bg-muted/30 rounded-lg p-4 border border-border/50"
                    >
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                      <div className="text-2xl font-bold mt-1">
                        {stat.value}
                      </div>
                      <div
                        className={`text-xs mt-1 ${stat.color} flex items-center`}
                      >
                        {stat.change}
                        <svg
                          className="h-3 w-3 ml-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                          />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  {[
                    {
                      name: "Alex Johnson",
                      company: "TechCorp Inc.",
                      score: 92,
                      status: "New",
                      lastActivity: "10 minutes ago",
                    },
                    {
                      name: "Sarah Williams",
                      company: "Innovate Solutions",
                      score: 87,
                      status: "Contacted",
                      lastActivity: "1 hour ago",
                    },
                    {
                      name: "Michael Chen",
                      company: "Global Systems",
                      score: 78,
                      status: "Qualified",
                      lastActivity: "3 hours ago",
                    },
                  ].map((lead, i) => (
                    <div
                      key={i}
                      className="p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            {lead.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium">{lead.name}</h3>
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full ${lead.status === "New" ? "bg-blue-500/20 text-blue-500" : lead.status === "Contacted" ? "bg-amber-500/20 text-amber-500" : "bg-green-500/20 text-green-500"}`}
                              >
                                {lead.status}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {lead.company}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-center space-x-1">
                            <div
                              className={`h-8 w-8 rounded-full flex items-center justify-center ${lead.score >= 90 ? "bg-green-500" : lead.score >= 80 ? "bg-blue-500" : "bg-amber-500"}`}
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
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need to manage, qualify, and communicate with
                your leads effectively.
              </p>
            </div>

            {/* Dashboard Screenshots */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden border border-border/50 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                    alt="Lead Management Dashboard"
                    className="w-full h-auto"
                  />
                </div>
                <h3 className="text-xl font-bold">Lead Management Dashboard</h3>
                <p className="text-muted-foreground">
                  Track and manage all your leads in one place with our
                  intuitive dashboard.
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden border border-border/50 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80"
                    alt="AI Messaging Interface"
                    className="w-full h-auto"
                  />
                </div>
                <h3 className="text-xl font-bold">AI Messaging Center</h3>
                <p className="text-muted-foreground">
                  Engage with leads using our AI-powered messaging system that
                  automatically qualifies and responds.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="overflow-hidden border-primary/10 transition-all hover:shadow-md hover:border-primary/30">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Lead Management</h3>
                  <p className="text-muted-foreground">
                    Organize, filter, and prioritize your leads with our
                    intuitive interface.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-primary/10 transition-all hover:shadow-md hover:border-primary/30">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">AI Qualification</h3>
                  <p className="text-muted-foreground">
                    Let AI analyze and score your leads based on engagement and
                    intent signals.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-primary/10 transition-all hover:shadow-md hover:border-primary/30">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Communication Center
                  </h3>
                  <p className="text-muted-foreground">
                    Send personalized messages and automate follow-ups with
                    Twilio integration.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Voice AI Section */}
          <section className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="rounded-lg overflow-hidden border border-border/50 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1590650046871-92c887180603?w=800&q=80"
                  alt="Voice AI Interface"
                  className="w-full h-auto"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">
                  Millis Voice AI Integration
                </h2>
                <p className="text-xl text-muted-foreground">
                  Our platform seamlessly integrates with Millis AI to provide
                  advanced voice capabilities for your lead interactions.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg
                        className="h-3 w-3 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span>Natural-sounding AI voice technology</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg
                        className="h-3 w-3 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span>Automated call qualification and follow-up</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg
                        className="h-3 w-3 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span>
                      Voice sentiment analysis and lead intent scoring
                    </span>
                  </li>
                </ul>
                <Button
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  onClick={handleGetStarted}
                >
                  Try Voice AI Now
                </Button>
              </div>
            </div>
          </section>

          {/* Integration Section */}
          <section className="py-16 bg-muted/30 rounded-xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Powerful Integrations</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Connect with your favorite tools and services to create a
                seamless lead management workflow.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
              {[
                {
                  name: "Twilio",
                  logo: "https://www.vectorlogo.zone/logos/twilio/twilio-icon.svg",
                },
                {
                  name: "OpenAI",
                  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1024px-OpenAI_Logo.svg.png",
                },
                {
                  name: "Salesforce",
                  logo: "https://www.vectorlogo.zone/logos/salesforce/salesforce-icon.svg",
                },
                {
                  name: "HubSpot",
                  logo: "https://www.vectorlogo.zone/logos/hubspot/hubspot-icon.svg",
                },
                {
                  name: "Slack",
                  logo: "https://www.vectorlogo.zone/logos/slack/slack-icon.svg",
                },
                {
                  name: "Zapier",
                  logo: "https://www.vectorlogo.zone/logos/zapier/zapier-icon.svg",
                },
              ].map((integration, index) => (
                <div
                  key={index}
                  className="bg-background rounded-lg p-4 flex items-center justify-center w-24 h-24 shadow-sm border border-border/50"
                >
                  <img
                    src={integration.logo}
                    alt={integration.name}
                    className="h-12 w-12 object-contain"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Join thousands of businesses using Lead Genius to qualify and
                convert more leads.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                onClick={handleGetStarted}
              >
                Start Your Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </section>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Lead Genius</h3>
              <p className="text-muted-foreground">
                AI-powered lead management platform for modern sales teams.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="cursor-pointer hover:text-primary">Features</li>
                <li className="cursor-pointer hover:text-primary">Pricing</li>
                <li className="cursor-pointer hover:text-primary">
                  Integrations
                </li>
                <li className="cursor-pointer hover:text-primary">Roadmap</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="cursor-pointer hover:text-primary">
                  Documentation
                </li>
                <li className="cursor-pointer hover:text-primary">Blog</li>
                <li className="cursor-pointer hover:text-primary">Support</li>
                <li className="cursor-pointer hover:text-primary">API</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="cursor-pointer hover:text-primary">About</li>
                <li className="cursor-pointer hover:text-primary">Careers</li>
                <li className="cursor-pointer hover:text-primary">Contact</li>
                <li className="cursor-pointer hover:text-primary">
                  Privacy Policy
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 mt-8 pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Lead Genius. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

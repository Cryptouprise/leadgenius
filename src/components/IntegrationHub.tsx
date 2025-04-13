import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  Check,
  Globe,
  MessageSquare,
  RefreshCw,
  Save,
  Server,
  Settings,
  Webhook,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface IntegrationHubProps {
  onSave?: () => void;
  initialTab?: string;
}

const IntegrationHub = ({
  onSave = () => {},
  initialTab = "webhooks",
}: IntegrationHubProps) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [webhookStatus, setWebhookStatus] = useState<"active" | "inactive">(
    "active",
  );
  const [twilioConnected, setTwilioConnected] = useState(false);
  const [emailConnected, setEmailConnected] = useState(false);
  const [openAIConnected, setOpenAIConnected] = useState(false);
  const [openRouterConnected, setOpenRouterConnected] = useState(false);

  const handleTestConnection = (service: string) => {
    // Simulate connection test
    console.log(`Testing connection to ${service}...`);

    // In a real app, this would make an API call to test the connection
    setTimeout(() => {
      switch (service) {
        case "twilio":
          setTwilioConnected(true);
          break;
        case "email":
          setEmailConnected(true);
          break;
        case "openai":
          setOpenAIConnected(true);
          break;
        case "openrouter":
          setOpenRouterConnected(true);
          break;
      }
    }, 1000);
  };

  return (
    <div className="w-full p-6 bg-background rounded-xl border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Integration Hub</h1>
          <p className="text-muted-foreground">
            Configure external services and connections
          </p>
        </div>
        <Button onClick={onSave}>
          <Save className="mr-2 h-4 w-4" />
          Save All Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 gap-4 mb-8">
          <TabsTrigger value="webhooks" className="flex items-center">
            <Webhook className="mr-2 h-4 w-4" />
            Webhooks
          </TabsTrigger>
          <TabsTrigger value="twilio" className="flex items-center">
            <MessageSquare className="mr-2 h-4 w-4" />
            Twilio
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center">
            <Globe className="mr-2 h-4 w-4" />
            Email Integration
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            AI API Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="webhooks" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Webhook Configuration</CardTitle>
                  <CardDescription>
                    Configure lead capture webhooks
                  </CardDescription>
                </div>
                <Badge
                  variant={
                    webhookStatus === "active" ? "default" : "destructive"
                  }
                >
                  {webhookStatus === "active" ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">Webhook Status</h3>
                  <p className="text-sm text-muted-foreground">
                    Enable or disable the webhook endpoint
                  </p>
                </div>
                <Switch
                  checked={webhookStatus === "active"}
                  onCheckedChange={(checked) =>
                    setWebhookStatus(checked ? "active" : "inactive")
                  }
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="webhook-url"
                      value="https://leadgenius.app/api/webhook/leads"
                      readOnly
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          "https://leadgenius.app/api/webhook/leads",
                        )
                      }
                    >
                      Copy
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Use this URL to send lead data to Lead Genius
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secret-key">Secret Key</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="secret-key"
                      type="password"
                      value="sk_lead_genius_webhook_12345"
                      readOnly
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          "sk_lead_genius_webhook_12345",
                        )
                      }
                    >
                      Copy
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Include this key in the request headers for authentication
                  </p>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Webhook Format</AlertTitle>
                <AlertDescription>
                  Send POST requests with JSON payload containing lead
                  information. Required fields: name, email, phone, source, and
                  intent_score.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset Secret Key</Button>
              <Button>Test Webhook</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lead Capture Rules</CardTitle>
              <CardDescription>
                Define how incoming leads are processed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">Auto-Tag High Intent Leads</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatically tag leads with intent score &gt; 80
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">Auto-Respond to New Leads</h3>
                  <p className="text-sm text-muted-foreground">
                    Send automated welcome message to new leads
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">Duplicate Detection</h3>
                  <p className="text-sm text-muted-foreground">
                    Prevent duplicate leads based on email or phone
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="twilio" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Twilio Integration</CardTitle>
                  <CardDescription>
                    Connect your Twilio account for SMS messaging
                  </CardDescription>
                </div>
                <Badge variant={twilioConnected ? "default" : "outline"}>
                  {twilioConnected ? "Connected" : "Not Connected"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="account-sid">Account SID</Label>
                <Input
                  id="account-sid"
                  placeholder="Enter your Twilio Account SID"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="auth-token">Auth Token</Label>
                <Input
                  id="auth-token"
                  type="password"
                  placeholder="Enter your Twilio Auth Token"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone-number">Twilio Phone Number</Label>
                <Input id="phone-number" placeholder="+1234567890" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">Enable SMS Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    Send SMS notifications for high-intent leads
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Clear Credentials</Button>
              <Button onClick={() => handleTestConnection("twilio")}>
                {twilioConnected ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Connected
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Test Connection
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SMS Templates</CardTitle>
              <CardDescription>
                Configure templates for automated SMS messages
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="welcome-template">Welcome Message</Label>
                <Input
                  id="welcome-template"
                  placeholder="Welcome template"
                  defaultValue="Hi {{name}}, thanks for your interest! Our team will be in touch shortly. Reply to this message if you have any questions."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="follow-up-template">Follow-up Message</Label>
                <Input
                  id="follow-up-template"
                  placeholder="Follow-up template"
                  defaultValue="Hi {{name}}, just checking in about your interest in our services. Would you like to schedule a call?"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Email Platform Integration</CardTitle>
                  <CardDescription>
                    Connect your email marketing platform
                  </CardDescription>
                </div>
                <Badge variant={emailConnected ? "default" : "outline"}>
                  {emailConnected ? "Connected" : "Not Connected"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platform">Email Platform</Label>
                <select
                  id="platform"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="mailchimp">Mailchimp</option>
                  <option value="sendgrid">SendGrid</option>
                  <option value="klaviyo">Klaviyo</option>
                  <option value="lemlist">Lemlist</option>
                  <option value="instantly">Instantly</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="Enter your API key"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="list-id">Default List ID</Label>
                <Input
                  id="list-id"
                  placeholder="Enter default list ID for new leads"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">
                    Auto-Forward High Intent Leads
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Automatically forward high-intent leads to email platform
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Clear Credentials</Button>
              <Button onClick={() => handleTestConnection("email")}>
                {emailConnected ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Connected
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Test Connection
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Campaign Settings</CardTitle>
              <CardDescription>
                Configure default settings for email campaigns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sender-name">Default Sender Name</Label>
                <Input id="sender-name" placeholder="John Doe" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sender-email">Default Sender Email</Label>
                <Input id="sender-email" placeholder="john@example.com" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">Track Email Opens</h3>
                  <p className="text-sm text-muted-foreground">
                    Track when recipients open emails
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">Track Link Clicks</h3>
                  <p className="text-sm text-muted-foreground">
                    Track when recipients click links in emails
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>OpenAI Configuration</CardTitle>
                  <CardDescription>
                    Configure OpenAI API settings
                  </CardDescription>
                </div>
                <Badge variant={openAIConnected ? "default" : "outline"}>
                  {openAIConnected ? "Connected" : "Not Connected"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="openai-key">API Key</Label>
                <Input
                  id="openai-key"
                  type="password"
                  placeholder="Enter your OpenAI API key"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="openai-model">Default Model</Label>
                <select
                  id="openai-model"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="gpt-4o">GPT-4o</option>
                  <option value="gpt-4-turbo">GPT-4 Turbo</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="openai-temperature">Temperature</Label>
                <Input
                  id="openai-temperature"
                  type="number"
                  min="0"
                  max="2"
                  step="0.1"
                  defaultValue="0.7"
                />
                <p className="text-sm text-muted-foreground">
                  Controls randomness: 0 is deterministic, 2 is most random
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">Use for Lead Qualification</h3>
                  <p className="text-sm text-muted-foreground">
                    Use AI to qualify and score incoming leads
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Clear Credentials</Button>
              <Button onClick={() => handleTestConnection("openai")}>
                {openAIConnected ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Connected
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Test Connection
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>OpenRouter Configuration</CardTitle>
                  <CardDescription>
                    Configure OpenRouter API settings
                  </CardDescription>
                </div>
                <Badge variant={openRouterConnected ? "default" : "outline"}>
                  {openRouterConnected ? "Connected" : "Not Connected"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="openrouter-key">API Key</Label>
                <Input
                  id="openrouter-key"
                  type="password"
                  placeholder="Enter your OpenRouter API key"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="openrouter-model">Default Model</Label>
                <select
                  id="openrouter-model"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="anthropic/claude-3-opus">Claude 3 Opus</option>
                  <option value="anthropic/claude-3-sonnet">
                    Claude 3 Sonnet
                  </option>
                  <option value="meta-llama/llama-3-70b-instruct">
                    Llama 3 70B
                  </option>
                  <option value="google/gemini-pro">Gemini Pro</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="openrouter-temperature">Temperature</Label>
                <Input
                  id="openrouter-temperature"
                  type="number"
                  min="0"
                  max="2"
                  step="0.1"
                  defaultValue="0.7"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">Use for Message Generation</h3>
                  <p className="text-sm text-muted-foreground">
                    Use AI to generate responses to lead messages
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Clear Credentials</Button>
              <Button onClick={() => handleTestConnection("openrouter")}>
                {openRouterConnected ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Connected
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Test Connection
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI System Prompts</CardTitle>
              <CardDescription>
                Configure system prompts for AI interactions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="qualification-prompt">
                  Lead Qualification Prompt
                </Label>
                <textarea
                  id="qualification-prompt"
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  placeholder="Enter system prompt for lead qualification"
                  defaultValue="You are a lead qualification assistant. Analyze the lead information and determine their intent level (high, medium, low) based on their message content, source, and behavior. Provide a score from 0-100 and a brief explanation."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="response-prompt">Message Response Prompt</Label>
                <textarea
                  id="response-prompt"
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  placeholder="Enter system prompt for message responses"
                  defaultValue="You are a helpful sales assistant for our company. Respond to customer inquiries in a friendly, professional manner. Keep responses concise (under 160 characters for SMS) while addressing their questions and encouraging next steps. Don't make up information you don't have."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationHub;

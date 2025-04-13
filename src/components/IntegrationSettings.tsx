import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  Check,
  Webhook,
  MessageSquare,
  Mail,
  Brain,
  RefreshCw,
  Save,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface IntegrationSettingsProps {
  onSave?: () => void;
  initialSettings?: {
    openai?: {
      apiKey: string;
      model: string;
      enabled: boolean;
    };
    openrouter?: {
      apiKey: string;
      model: string;
      enabled: boolean;
    };
    twilio?: {
      accountSid: string;
      authToken: string;
      phoneNumber: string;
      enabled: boolean;
    };
    webhook?: {
      endpoint: string;
      secret: string;
      enabled: boolean;
    };
    email?: {
      provider: string;
      apiKey: string;
      enabled: boolean;
    };
  };
}

const IntegrationSettings: React.FC<IntegrationSettingsProps> = ({
  onSave = () => {},
  initialSettings = {
    openai: {
      apiKey: "",
      model: "gpt-4",
      enabled: false,
    },
    openrouter: {
      apiKey: "",
      model: "anthropic/claude-3-opus",
      enabled: false,
    },
    twilio: {
      accountSid: "",
      authToken: "",
      phoneNumber: "",
      enabled: false,
    },
    webhook: {
      endpoint: "https://api.leadgenius.com/webhook",
      secret: "",
      enabled: true,
    },
    email: {
      provider: "instantly",
      apiKey: "",
      enabled: false,
    },
  },
}) => {
  const [settings, setSettings] = useState(initialSettings);
  const [activeTab, setActiveTab] = useState("ai");
  const [testStatus, setTestStatus] = useState<{
    openai?: "success" | "error" | "loading" | null;
    openrouter?: "success" | "error" | "loading" | null;
    twilio?: "success" | "error" | "loading" | null;
    webhook?: "success" | "error" | "loading" | null;
    email?: "success" | "error" | "loading" | null;
  }>({});

  const handleInputChange = (
    integration: string,
    field: string,
    value: string | boolean,
  ) => {
    setSettings((prev) => ({
      ...prev,
      [integration]: {
        ...prev[integration as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  const testConnection = (
    integration: "openai" | "openrouter" | "twilio" | "webhook" | "email",
  ) => {
    setTestStatus((prev) => ({ ...prev, [integration]: "loading" }));

    // Simulate API call
    setTimeout(() => {
      // For demo purposes, we'll simulate success for filled fields and error for empty ones
      const integrationSettings = settings[integration];
      const hasEmptyFields = Object.values(integrationSettings || {}).some(
        (value) => typeof value === "string" && value.trim() === "",
      );

      setTestStatus((prev) => ({
        ...prev,
        [integration]: hasEmptyFields ? "error" : "success",
      }));
    }, 1500);
  };

  const saveSettings = () => {
    // Here you would typically save to your backend
    console.log("Saving settings:", settings);
    onSave();
  };

  const getStatusIcon = (
    status: "success" | "error" | "loading" | null | undefined,
  ) => {
    if (status === "loading")
      return <RefreshCw className="h-4 w-4 animate-spin" />;
    if (status === "success")
      return <Check className="h-4 w-4 text-green-500" />;
    if (status === "error")
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    return null;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight">
          Integration Settings
        </h1>
        <p className="text-muted-foreground mt-2">
          Configure your integrations to connect Lead Genius with external
          services.
        </p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span>AI Integration</span>
          </TabsTrigger>
          <TabsTrigger value="twilio" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Twilio</span>
          </TabsTrigger>
          <TabsTrigger value="webhook" className="flex items-center gap-2">
            <Webhook className="h-4 w-4" />
            <span>Webhooks</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>Email</span>
          </TabsTrigger>
        </TabsList>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <TabsContent value="ai" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>OpenAI Configuration</span>
                  <Badge
                    variant={settings.openai?.enabled ? "default" : "outline"}
                  >
                    {settings.openai?.enabled ? "Enabled" : "Disabled"}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Connect to OpenAI to power AI-driven lead qualification and
                  responses.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="openai-enabled">
                    Enable OpenAI Integration
                  </Label>
                  <Switch
                    id="openai-enabled"
                    checked={settings.openai?.enabled}
                    onCheckedChange={(checked) =>
                      handleInputChange("openai", "enabled", checked)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="openai-api-key">API Key</Label>
                  <Input
                    id="openai-api-key"
                    type="password"
                    placeholder="sk-..."
                    value={settings.openai?.apiKey}
                    onChange={(e) =>
                      handleInputChange("openai", "apiKey", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="openai-model">Model</Label>
                  <Input
                    id="openai-model"
                    placeholder="gpt-4"
                    value={settings.openai?.model}
                    onChange={(e) =>
                      handleInputChange("openai", "model", e.target.value)
                    }
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => testConnection("openai")}
                  disabled={testStatus.openai === "loading"}
                >
                  {getStatusIcon(testStatus.openai)}
                  <span className="ml-2">Test Connection</span>
                </Button>
                {testStatus.openai === "success" && (
                  <Alert className="p-2 border-green-200 bg-green-50 text-green-800">
                    <AlertDescription>Connection successful!</AlertDescription>
                  </Alert>
                )}
                {testStatus.openai === "error" && (
                  <Alert className="p-2 border-red-200 bg-red-50 text-red-800">
                    <AlertDescription>
                      Connection failed. Check your credentials.
                    </AlertDescription>
                  </Alert>
                )}
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>OpenRouter Configuration</span>
                  <Badge
                    variant={
                      settings.openrouter?.enabled ? "default" : "outline"
                    }
                  >
                    {settings.openrouter?.enabled ? "Enabled" : "Disabled"}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Connect to OpenRouter for access to multiple AI models through
                  a single API.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="openrouter-enabled">
                    Enable OpenRouter Integration
                  </Label>
                  <Switch
                    id="openrouter-enabled"
                    checked={settings.openrouter?.enabled}
                    onCheckedChange={(checked) =>
                      handleInputChange("openrouter", "enabled", checked)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="openrouter-api-key">API Key</Label>
                  <Input
                    id="openrouter-api-key"
                    type="password"
                    placeholder="sk-..."
                    value={settings.openrouter?.apiKey}
                    onChange={(e) =>
                      handleInputChange("openrouter", "apiKey", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="openrouter-model">Default Model</Label>
                  <Input
                    id="openrouter-model"
                    placeholder="anthropic/claude-3-opus"
                    value={settings.openrouter?.model}
                    onChange={(e) =>
                      handleInputChange("openrouter", "model", e.target.value)
                    }
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => testConnection("openrouter")}
                  disabled={testStatus.openrouter === "loading"}
                >
                  {getStatusIcon(testStatus.openrouter)}
                  <span className="ml-2">Test Connection</span>
                </Button>
                {testStatus.openrouter === "success" && (
                  <Alert className="p-2 border-green-200 bg-green-50 text-green-800">
                    <AlertDescription>Connection successful!</AlertDescription>
                  </Alert>
                )}
                {testStatus.openrouter === "error" && (
                  <Alert className="p-2 border-red-200 bg-red-50 text-red-800">
                    <AlertDescription>
                      Connection failed. Check your credentials.
                    </AlertDescription>
                  </Alert>
                )}
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="twilio" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Twilio Configuration</span>
                  <Badge
                    variant={settings.twilio?.enabled ? "default" : "outline"}
                  >
                    {settings.twilio?.enabled ? "Enabled" : "Disabled"}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Connect to Twilio to send and receive SMS messages with your
                  leads.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="twilio-enabled">
                    Enable Twilio Integration
                  </Label>
                  <Switch
                    id="twilio-enabled"
                    checked={settings.twilio?.enabled}
                    onCheckedChange={(checked) =>
                      handleInputChange("twilio", "enabled", checked)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twilio-account-sid">Account SID</Label>
                  <Input
                    id="twilio-account-sid"
                    placeholder="AC..."
                    value={settings.twilio?.accountSid}
                    onChange={(e) =>
                      handleInputChange("twilio", "accountSid", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twilio-auth-token">Auth Token</Label>
                  <Input
                    id="twilio-auth-token"
                    type="password"
                    placeholder="Your Twilio auth token"
                    value={settings.twilio?.authToken}
                    onChange={(e) =>
                      handleInputChange("twilio", "authToken", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twilio-phone-number">Phone Number</Label>
                  <Input
                    id="twilio-phone-number"
                    placeholder="+1234567890"
                    value={settings.twilio?.phoneNumber}
                    onChange={(e) =>
                      handleInputChange("twilio", "phoneNumber", e.target.value)
                    }
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => testConnection("twilio")}
                  disabled={testStatus.twilio === "loading"}
                >
                  {getStatusIcon(testStatus.twilio)}
                  <span className="ml-2">Test Connection</span>
                </Button>
                {testStatus.twilio === "success" && (
                  <Alert className="p-2 border-green-200 bg-green-50 text-green-800">
                    <AlertDescription>Connection successful!</AlertDescription>
                  </Alert>
                )}
                {testStatus.twilio === "error" && (
                  <Alert className="p-2 border-red-200 bg-red-50 text-red-800">
                    <AlertDescription>
                      Connection failed. Check your credentials.
                    </AlertDescription>
                  </Alert>
                )}
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="webhook" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Webhook Configuration</span>
                  <Badge
                    variant={settings.webhook?.enabled ? "default" : "outline"}
                  >
                    {settings.webhook?.enabled ? "Enabled" : "Disabled"}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Configure webhooks to receive lead data from external sources.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="webhook-enabled">Enable Webhook</Label>
                  <Switch
                    id="webhook-enabled"
                    checked={settings.webhook?.enabled}
                    onCheckedChange={(checked) =>
                      handleInputChange("webhook", "enabled", checked)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="webhook-endpoint">Webhook Endpoint</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="webhook-endpoint"
                      value={settings.webhook?.endpoint}
                      onChange={(e) =>
                        handleInputChange("webhook", "endpoint", e.target.value)
                      }
                      readOnly
                    />
                    <Button
                      variant="outline"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          settings.webhook?.endpoint || "",
                        )
                      }
                    >
                      Copy
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Use this URL to receive lead data from external sources.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="webhook-secret">Webhook Secret</Label>
                  <Input
                    id="webhook-secret"
                    type="password"
                    placeholder="Your webhook secret"
                    value={settings.webhook?.secret}
                    onChange={(e) =>
                      handleInputChange("webhook", "secret", e.target.value)
                    }
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    This secret is used to verify webhook requests.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => testConnection("webhook")}
                  disabled={testStatus.webhook === "loading"}
                >
                  {getStatusIcon(testStatus.webhook)}
                  <span className="ml-2">Test Webhook</span>
                </Button>
                {testStatus.webhook === "success" && (
                  <Alert className="p-2 border-green-200 bg-green-50 text-green-800">
                    <AlertDescription>
                      Webhook is properly configured!
                    </AlertDescription>
                  </Alert>
                )}
                {testStatus.webhook === "error" && (
                  <Alert className="p-2 border-red-200 bg-red-50 text-red-800">
                    <AlertDescription>
                      Webhook configuration is incomplete.
                    </AlertDescription>
                  </Alert>
                )}
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="email" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Email Integration</span>
                  <Badge
                    variant={settings.email?.enabled ? "default" : "outline"}
                  >
                    {settings.email?.enabled ? "Enabled" : "Disabled"}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Connect to email services for cold outreach campaigns.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-enabled">
                    Enable Email Integration
                  </Label>
                  <Switch
                    id="email-enabled"
                    checked={settings.email?.enabled}
                    onCheckedChange={(checked) =>
                      handleInputChange("email", "enabled", checked)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-provider">Email Provider</Label>
                  <Input
                    id="email-provider"
                    placeholder="instantly"
                    value={settings.email?.provider}
                    onChange={(e) =>
                      handleInputChange("email", "provider", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-api-key">API Key</Label>
                  <Input
                    id="email-api-key"
                    type="password"
                    placeholder="Your email provider API key"
                    value={settings.email?.apiKey}
                    onChange={(e) =>
                      handleInputChange("email", "apiKey", e.target.value)
                    }
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => testConnection("email")}
                  disabled={testStatus.email === "loading"}
                >
                  {getStatusIcon(testStatus.email)}
                  <span className="ml-2">Test Connection</span>
                </Button>
                {testStatus.email === "success" && (
                  <Alert className="p-2 border-green-200 bg-green-50 text-green-800">
                    <AlertDescription>Connection successful!</AlertDescription>
                  </Alert>
                )}
                {testStatus.email === "error" && (
                  <Alert className="p-2 border-red-200 bg-red-50 text-red-800">
                    <AlertDescription>
                      Connection failed. Check your credentials.
                    </AlertDescription>
                  </Alert>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
        </motion.div>
      </Tabs>

      <Separator className="my-8" />

      <div className="flex justify-end">
        <Button onClick={saveSettings} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          <span>Save All Settings</span>
        </Button>
      </div>
    </div>
  );
};

export default IntegrationSettings;

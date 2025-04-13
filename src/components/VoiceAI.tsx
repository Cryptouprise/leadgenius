import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VoiceAI = () => {
  const [autoRespond, setAutoRespond] = useState(true);
  const [voiceModel, setVoiceModel] = useState("Millis Natural");
  const [apiKey, setApiKey] = useState("aznyFd54f8yroMB0mxZEws1K5giMYMat");
  const [publicKey, setPublicKey] = useState(
    "o8YhQPYM8u1ShlPh55ik2pQrHcOrdoPk",
  );
  const [agentId, setAgentId] = useState("-OLWMRYSG3zk8TWbIrLi");
  const [voiceSpeed, setVoiceSpeed] = useState([50]);
  const [voicePitch, setVoicePitch] = useState([50]);

  // Using embedded widget instead of direct WebSocket connection

  const handleSaveSettings = () => {
    // In a real app, this would save the voice settings to the user's profile
    console.log("Saving voice settings");
    console.log("Voice model:", voiceModel);
    console.log("Auto-respond:", autoRespond);
    console.log("Voice speed:", voiceSpeed[0]);
    console.log("Voice pitch:", voicePitch[0]);
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Tabs defaultValue="voice-chat" className="w-full">
          <TabsList className="mb-6 bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="voice-chat">Voice Chat</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="voice-chat" className="space-y-6">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" x2="12" y1="19" y2="22"></line>
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Millis Voice AI</h2>
              <p className="text-slate-300 text-center max-w-md mb-8">
                Speak with your leads using natural-sounding AI voice technology
                using the embedded call widget below.
              </p>

              <div className="w-full max-w-2xl bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8">
                <div className="w-full mb-4 flex flex-col items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-lg mb-6 w-full flex flex-col items-center justify-center">
                    <div className="h-12 w-12 text-white mb-4 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 12a10 10 0 1 0 20 0 10 10 0 1 0-20 0" />
                        <path d="M6 12a6 6 0 1 0 12 0 6 6 0 1 0-12 0" />
                        <path d="M10 9v6l5-3-5-3z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Millis Voice AI Widget
                    </h3>
                    <p className="text-white/80 text-center mb-6">
                      The widget needs to open in a separate window due to
                      iframe restrictions
                    </p>
                    <button
                      className="bg-white text-blue-600 hover:bg-white/90 font-medium px-6 py-3 rounded-md flex items-center"
                      onClick={() =>
                        window.open(
                          "https://app.millis.ai/agents/embedded?id=-OLWMRYSG3zk8TWbIrLi&k=o8YhQPYM8u1ShlPh55ik2pQrHcOrdoPk&c=eJxlkN1qwzAMhV%2FFGAYJJGlsmm5NL%2FsIvd2NE7uumGMHWaFjpe8%2FB491P2AMR0f%2BfKQbJyBnIu9vHLQzvOcnUki84mPw3owE3qbi8Vs0TZNMXLzPzonCzO8Vh9T%2FE3N%2B7icY%2F3JIDc5grwPFX5TcXUen4mWlDQtR8McYVw8cpTdMY5jreFE6XIuWtUx28ztDO6hC7PZJSSbknm1Y1z6V5eHVD2p8sxgWr2uYlDU9c%2BCNwtqi0mA8FUJ02thqhRTbHctnw0SbCP%2BqL%2BILG1CvcUT6PQYHOmeQXVexx9U2clse0ozngFOeI4lHpKwjfKRdiV1bcULl44gwE%2B8JF5O2YywEnxqXWF9NJH7%2FBK5OhFI%3D",
                          "_blank",
                          "width=500,height=700",
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                      Launch Voice AI
                    </button>
                  </div>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="h-px bg-slate-700 flex-grow"></div>
                    <span className="text-sm text-slate-400">OR</span>
                    <div className="h-px bg-slate-700 flex-grow"></div>
                  </div>
                  <button
                    className="border border-dashed border-slate-600 text-slate-300 px-4 py-2 rounded-md hover:bg-slate-800"
                    onClick={() =>
                      window.open(
                        "https://app.millis.ai/agents/embedded?id=-OLWMRYSG3zk8TWbIrLi&k=o8YhQPYM8u1ShlPh55ik2pQrHcOrdoPk&c=eJxlkN1qwzAMhV%2FFGAYJJGlsmm5NL%2FsIvd2NE7uumGMHWaFjpe8%2FB491P2AMR0f%2BfKQbJyBnIu9vHLQzvOcnUki84mPw3owE3qbi8Vs0TZNMXLzPzonCzO8Vh9T%2FE3N%2B7icY%2F3JIDc5grwPFX5TcXUen4mWlDQtR8McYVw8cpTdMY5jreFE6XIuWtUx28ztDO6hC7PZJSSbknm1Y1z6V5eHVD2p8sxgWr2uYlDU9c%2BCNwtqi0mA8FUJ02thqhRTbHctnw0SbCP%2BqL%2BILG1CvcUT6PQYHOmeQXVexx9U2clse0ozngFOeI4lHpKwjfKRdiV1bcULl44gwE%2B8JF5O2YywEnxqXWF9NJH7%2FBK5OhFI%3D",
                        "_blank",
                      )
                    }
                  >
                    Open in Full Browser Tab
                  </button>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4 w-full">
                  <p className="text-sm text-slate-400">
                    <strong>Note:</strong> The Millis AI widget opens in a new
                    window to avoid iframe restrictions. Make sure to allow
                    microphone access when prompted.
                  </p>
                </div>
              </div>
            </div>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Recent Voice Conversations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="p-4 border border-slate-700 rounded-lg"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-blue-500"
                            >
                              <path d="M2 12a10 10 0 1 0 20 0 10 10 0 1 0-20 0" />
                              <path d="M6 12a6 6 0 1 0 12 0 6 6 0 1 0-12 0" />
                              <path d="M10 9v6l5-3-5-3z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Voice Call {i + 1}</h4>
                            <p className="text-xs text-slate-400">
                              {new Date().toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <button className="p-1 rounded-md hover:bg-slate-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                        </button>
                      </div>
                      <p className="text-sm text-slate-300">
                        {i === 0
                          ? "Initial lead qualification call with potential customer."
                          : i === 1
                            ? "Follow-up discussion about pricing options."
                            : "Product demonstration and feature overview."}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Voice AI Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="api-key">Millis AI API Key</Label>
                      <Input
                        id="api-key"
                        type="password"
                        placeholder="Your Millis API Key"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="flex-1 bg-slate-900 border-slate-700"
                      />
                    </div>

                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="public-key">Millis AI Public Key</Label>
                      <Input
                        id="public-key"
                        type="password"
                        placeholder="Your Millis Public Key"
                        value={publicKey}
                        onChange={(e) => setPublicKey(e.target.value)}
                        className="flex-1 bg-slate-900 border-slate-700"
                      />
                    </div>

                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="agent-id">Millis AI Agent ID</Label>
                      <Input
                        id="agent-id"
                        type="text"
                        placeholder="Your Millis Agent ID"
                        value={agentId}
                        onChange={(e) => setAgentId(e.target.value)}
                        className="flex-1 bg-slate-900 border-slate-700"
                      />
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded-md border border-slate-700">
                      <p className="text-sm text-green-500 mb-2">
                        ✓ Using embedded Millis AI widget
                      </p>
                      <p className="text-xs text-slate-400">
                        The widget automatically connects to Millis AI using the
                        credentials above. Changes to these credentials will be
                        reflected when the page is refreshed.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Voice Model</Label>
                    <select
                      className="w-full p-2 rounded-md bg-slate-900 border border-slate-700"
                      value={voiceModel}
                      onChange={(e) => setVoiceModel(e.target.value)}
                    >
                      <option>Millis Natural</option>
                      <option>Millis Professional</option>
                      <option>Millis Casual</option>
                      <option>Millis Executive</option>
                      <option>Millis Friendly</option>
                      <option>Millis Authoritative</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-respond">Auto-Respond to Calls</Label>
                    <Switch
                      id="auto-respond"
                      checked={autoRespond}
                      onCheckedChange={setAutoRespond}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Voice Speed</Label>
                      <span className="text-sm text-slate-400">
                        {voiceSpeed[0]}%
                      </span>
                    </div>
                    <Slider
                      defaultValue={[50]}
                      max={100}
                      step={1}
                      value={voiceSpeed}
                      onValueChange={setVoiceSpeed}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Voice Pitch</Label>
                      <span className="text-sm text-slate-400">
                        {voicePitch[0]}%
                      </span>
                    </div>
                    <Slider
                      defaultValue={[50]}
                      max={100}
                      step={1}
                      value={voicePitch}
                      onValueChange={setVoicePitch}
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
                    onClick={handleSaveSettings}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                      <polyline points="17 21 17 13 7 13 7 21"></polyline>
                      <polyline points="7 3 7 8 15 8"></polyline>
                    </svg>
                    Save Settings
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Enable Voice Analytics</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Save Voice Recordings</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Use Enhanced AI Model</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Allow Background Noise Filtering</Label>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Voice Conversation History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="p-4 border border-slate-700 rounded-lg"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-blue-500"
                            >
                              <path d="M2 12a10 10 0 1 0 20 0 10 10 0 1 0-20 0" />
                              <path d="M6 12a6 6 0 1 0 12 0 6 6 0 1 0-12 0" />
                              <path d="M10 9v6l5-3-5-3z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">
                              Call with Lead #{1000 + i}
                            </h4>
                            <p className="text-xs text-slate-400">
                              {new Date(
                                Date.now() - i * 86400000,
                              ).toLocaleDateString()}{" "}
                              • {Math.floor(Math.random() * 10) + 2}:
                              {Math.floor(Math.random() * 60)
                                .toString()
                                .padStart(2, "0")}{" "}
                              min
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-1 rounded-md hover:bg-slate-700">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                          </button>
                          <button className="p-1 rounded-md hover:bg-slate-700">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-slate-300 mb-2">
                        {
                          [
                            "Initial qualification call discussing product needs and budget constraints.",
                            "Follow-up call about implementation timeline and resource requirements.",
                            "Product demonstration with Q&A session about specific features.",
                            "Pricing negotiation and discussion of contract terms.",
                            "Technical support call addressing integration questions.",
                          ][i]
                        }
                      </p>
                      <div className="flex justify-between">
                        <span className="text-xs text-slate-400">
                          AI Sentiment:{" "}
                          {
                            [
                              "Positive",
                              "Neutral",
                              "Very Positive",
                              "Neutral",
                              "Positive",
                            ][i]
                          }
                        </span>
                        <span className="text-xs text-slate-400">
                          Lead Intent:{" "}
                          {["High", "Medium", "Very High", "Medium", "High"][i]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default VoiceAI;

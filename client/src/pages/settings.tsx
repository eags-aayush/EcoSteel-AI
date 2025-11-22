import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Database,
  Wifi,
  Thermometer,
  Zap,
  Activity,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff
} from "lucide-react";

export default function Settings() {
  const [mqttSettings, setMqttSettings] = useState({
    host: "mqtt.ecosteel.local",
    port: "1883",
    username: "",
    password: "",
    topic: "ecosteel/furnaces/#"
  });

  const [alertThresholds, setAlertThresholds] = useState({
    temperature: { warning: 1450, critical: 1500 },
    vibration: { warning: 3.0, critical: 5.0 },
    emissions: { warning: 90, critical: 120 },
    power: { warning: 1300, critical: 1500 }
  });

  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: false,
    push: true,
    slack: false
  });

  const [systemSettings, setSystemSettings] = useState({
    autoBackup: true,
    dataRetention: "90",
    theme: "light",
    language: "en"
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSave = () => {
    // Simulate saving settings
    console.log("Settings saved");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">System Settings & Administration</h1>
          <p className="text-muted-foreground">Configure system parameters, thresholds, and user management</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="mqtt" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="mqtt">MQTT</TabsTrigger>
          <TabsTrigger value="thresholds">Thresholds</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="mqtt">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wifi className="w-5 h-5" />
                MQTT Configuration
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Configure MQTT broker settings for IoT device communication
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="mqtt-host">Broker Host</Label>
                    <Input
                      id="mqtt-host"
                      value={mqttSettings.host}
                      onChange={(e) => setMqttSettings({...mqttSettings, host: e.target.value})}
                      placeholder="mqtt.example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mqtt-port">Port</Label>
                    <Input
                      id="mqtt-port"
                      type="number"
                      value={mqttSettings.port}
                      onChange={(e) => setMqttSettings({...mqttSettings, port: e.target.value})}
                      placeholder="1883"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mqtt-topic">Topic Pattern</Label>
                    <Input
                      id="mqtt-topic"
                      value={mqttSettings.topic}
                      onChange={(e) => setMqttSettings({...mqttSettings, topic: e.target.value})}
                      placeholder="ecosteel/furnaces/#"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="mqtt-username">Username</Label>
                    <Input
                      id="mqtt-username"
                      value={mqttSettings.username}
                      onChange={(e) => setMqttSettings({...mqttSettings, username: e.target.value})}
                      placeholder="Optional"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mqtt-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="mqtt-password"
                        type={showPassword ? "text" : "password"}
                        value={mqttSettings.password}
                        onChange={(e) => setMqttSettings({...mqttSettings, password: e.target.value})}
                        placeholder="Optional"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Connection Status</Label>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600">Connected</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Device Mapping</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Sensor ID → Furnace Mapping</Label>
                    <Textarea
                      placeholder="TEMP001 → F1&#10;VIB001 → F1&#10;GAS001 → F2&#10;..."
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Active Devices</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <span className="text-sm">Temperature Sensors</span>
                        <Badge variant="outline">12 active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <span className="text-sm">Vibration Sensors</span>
                        <Badge variant="outline">8 active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <span className="text-sm">Gas Sensors</span>
                        <Badge variant="outline">6 active</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="thresholds">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Alert Thresholds
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Configure warning and critical thresholds for all monitored parameters
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(alertThresholds).map(([parameter, thresholds]) => (
                <div key={parameter} className="space-y-4">
                  <div className="flex items-center gap-2">
                    {parameter === "temperature" && <Thermometer className="w-4 h-4" />}
                    {parameter === "vibration" && <Activity className="w-4 h-4" />}
                    {parameter === "emissions" && <Zap className="w-4 h-4" />}
                    {parameter === "power" && <Zap className="w-4 h-4" />}
                    <h4 className="font-medium capitalize">{parameter} Thresholds</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Warning Threshold</Label>
                      <Input
                        type="number"
                        value={thresholds.warning}
                        onChange={(e) => setAlertThresholds({
                          ...alertThresholds,
                          [parameter]: { ...thresholds, warning: parseFloat(e.target.value) }
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Critical Threshold</Label>
                      <Input
                        type="number"
                        value={thresholds.critical}
                        onChange={(e) => setAlertThresholds({
                          ...alertThresholds,
                          [parameter]: { ...thresholds, critical: parseFloat(e.target.value) }
                        })}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Configure how and when you receive system alerts and notifications
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Notification Channels</h4>
                {Object.entries(notificationSettings).map(([channel, enabled]) => (
                  <div key={channel} className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base capitalize">{channel}</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via {channel}
                      </p>
                    </div>
                    <Switch
                      checked={enabled}
                      onCheckedChange={(checked) => setNotificationSettings({
                        ...notificationSettings,
                        [channel]: checked
                      })}
                    />
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Alert Categories</h4>
                <div className="space-y-3">
                  {[
                    { name: "Critical Alerts", description: "System failures, safety issues" },
                    { name: "Warning Alerts", description: "Parameter deviations, maintenance needed" },
                    { name: "Info Alerts", description: "Status updates, scheduled events" },
                    { name: "Maintenance Alerts", description: "Scheduled maintenance reminders" }
                  ].map((category) => (
                    <div key={category.name} className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">{category.name}</Label>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                User Management
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Manage user accounts, roles, and permissions
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "John Smith", role: "Plant Manager", status: "Active", lastLogin: "2 hours ago" },
                  { name: "Sarah Johnson", role: "Maintenance Engineer", status: "Active", lastLogin: "1 day ago" },
                  { name: "Mike Davis", role: "Operator", status: "Active", lastLogin: "30 min ago" },
                  { name: "Admin User", role: "Administrator", status: "Active", lastLogin: "5 min ago" }
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.role}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                        {user.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{user.lastLogin}</span>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="w-5 h-5" />
                  System Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Theme</Label>
                      <Select value={systemSettings.theme} onValueChange={(value) => setSystemSettings({...systemSettings, theme: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="auto">Auto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select value={systemSettings.language} onValueChange={(value) => setSystemSettings({...systemSettings, language: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Data Retention (days)</Label>
                      <Input
                        type="number"
                        value={systemSettings.dataRetention}
                        onChange={(e) => setSystemSettings({...systemSettings, dataRetention: e.target.value})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Automatic Backup</Label>
                        <p className="text-sm text-muted-foreground">Daily system backup</p>
                      </div>
                      <Switch
                        checked={systemSettings.autoBackup}
                        onCheckedChange={(checked) => setSystemSettings({...systemSettings, autoBackup: checked})}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">4</div>
                    <div className="text-sm text-muted-foreground">Active Furnaces</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">26</div>
                    <div className="text-sm text-muted-foreground">Connected Sensors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">99.7%</div>
                    <div className="text-sm text-muted-foreground">System Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">2.1</div>
                    <div className="text-sm text-muted-foreground">Version</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                System Maintenance
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Database maintenance, system updates, and diagnostic tools
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Database Operations</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Database className="w-4 h-4 mr-2" />
                      Optimize Database
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Database className="w-4 h-4 mr-2" />
                      Clean Old Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Database className="w-4 h-4 mr-2" />
                      Backup Database
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">System Diagnostics</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Activity className="w-4 h-4 mr-2" />
                      Run System Check
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Wifi className="w-4 h-4 mr-2" />
                      Test Connectivity
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Restart Services
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">System Logs</h4>
                <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm max-h-40 overflow-y-auto">
                  <div>[2024-01-15 14:30:25] System startup completed</div>
                  <div>[2024-01-15 14:30:26] MQTT connection established</div>
                  <div>[2024-01-15 14:30:27] All sensors online</div>
                  <div>[2024-01-15 14:31:15] Furnace F1 temperature alert acknowledged</div>
                  <div>[2024-01-15 14:32:01] Database backup completed</div>
                  <div>[2024-01-15 14:35:22] User login: admin</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

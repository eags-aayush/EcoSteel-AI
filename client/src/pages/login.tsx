import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Flame, Shield, Wrench, Eye, Lock, User } from "lucide-react";

const roles = [
  {
    id: "operator",
    title: "Plant Operator",
    description: "Monitor and control furnace operations in real-time",
    icon: Flame,
    color: "bg-blue-100 text-blue-800 border-blue-200",
    permissions: ["View Dashboard", "Control Furnaces", "Monitor Sensors", "Log Events"]
  },
  {
    id: "engineer",
    title: "Maintenance Engineer",
    description: "Perform maintenance tasks and troubleshoot equipment",
    icon: Wrench,
    color: "bg-green-100 text-green-800 border-green-200",
    permissions: ["All Operator permissions", "Maintenance Scheduling", "Equipment Diagnostics", "Safety Overrides"]
  },
  {
    id: "manager",
    title: "Plant Manager",
    description: "Oversee plant operations and make strategic decisions",
    icon: Shield,
    color: "bg-purple-100 text-purple-800 border-purple-200",
    permissions: ["All permissions", "User Management", "Reports & Analytics", "System Configuration"]
  }
];

export default function Login() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, this would redirect to the main app
      console.log("Login successful with role:", selectedRole);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
              <Flame className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">EcoSteel AI</h1>
              <p className="text-lg text-gray-600">Industry 4.0 Steel Plant Intelligence</p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Advanced Furnace Monitoring & Control
            </h2>
            <p className="text-gray-600">
              Real-time AI-powered steel production optimization for modern industrial facilities.
              Monitor emissions, predict maintenance, and maximize efficiency with cutting-edge technology.
            </p>
          </div>

          <div className="flex items-center justify-center gap-6 mt-6">
            <Badge variant="outline" className="px-3 py-1">
              <Eye className="w-4 h-4 mr-1" />
              Real-time Monitoring
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              <Shield className="w-4 h-4 mr-1" />
              AI-Powered Analytics
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              <Wrench className="w-4 h-4 mr-1" />
              Predictive Maintenance
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Role Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Select Your Role
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Choose your role to access appropriate features and permissions
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedRole === role.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${role.color}`}>
                      <role.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{role.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{role.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.slice(0, 2).map((permission, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                        {role.permissions.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{role.permissions.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Login Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Authentication
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Enter your credentials to access the system
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {selectedRole && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">
                      Logging in as: {roles.find(r => r.id === selectedRole)?.title}
                    </span>
                  </div>
                </div>
              )}

              <Button
                className="w-full"
                onClick={handleLogin}
                disabled={!selectedRole || !username || !password || isLoading}
              >
                {isLoading ? "Authenticating..." : "Login to EcoSteel AI"}
              </Button>

              <div className="text-center">
                <Button variant="ghost" className="text-sm">
                  Forgot password?
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Overview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <Flame className="w-12 h-12 mx-auto mb-4 text-orange-600" />
              <h3 className="font-semibold mb-2">Furnace Monitoring</h3>
              <p className="text-sm text-muted-foreground">
                Real-time temperature, pressure, and emissions tracking across all furnaces
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Eye className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="font-semibold mb-2">AI Vision</h3>
              <p className="text-sm text-muted-foreground">
                Computer vision analysis of scrap materials with OpenCV ML models
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Shield className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <h3 className="font-semibold mb-2">Predictive Maintenance</h3>
              <p className="text-sm text-muted-foreground">
                AI-driven equipment health monitoring and maintenance scheduling
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>© 2024 EcoSteel AI - Industry 4.0 Steel Plant Intelligence Platform</p>
          <p className="mt-1">Version 2.1.0 | Last updated: January 2024</p>
        </div>
      </div>
    </div>
  );
}
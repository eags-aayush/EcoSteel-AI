import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Info, XCircle, CheckCircle, Bell } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Alert } from "@shared/schema";

export default function Alerts() {
  const { toast } = useToast();

  const { data: alerts = [], isLoading } = useQuery<Alert[]>({
    queryKey: ['/api/alerts'],
    refetchInterval: 5000, // Refetch every 5 seconds for new alerts
  });

  const acknowledgeMutation = useMutation({
    mutationFn: async (alertId: string) => {
      return await apiRequest('POST', `/api/alerts/${alertId}/acknowledge`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/alerts'] });
      toast({
        title: "Alert Acknowledged",
        description: "The alert has been successfully acknowledged.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to acknowledge alert. Please try again.",
        variant: "destructive",
      });
    },
  });

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical": return XCircle;
      case "warning": return AlertTriangle;
      case "info": return Info;
      default: return Bell;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-destructive text-destructive-foreground";
      case "warning": return "bg-yellow-500 text-background";
      case "info": return "bg-primary text-primary-foreground";
      default: return "bg-muted";
    }
  };

  const handleAcknowledge = (id: string) => {
    acknowledgeMutation.mutate(id);
  };

  const formatTimeAgo = (timestamp: string) => {
    const minutes = Math.floor((Date.now() - new Date(timestamp).getTime()) / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const criticalAlerts = alerts.filter(a => a.severity === "critical");
  const warningAlerts = alerts.filter(a => a.severity === "warning");
  const infoAlerts = alerts.filter(a => a.severity === "info");
  const unacknowledged = alerts.filter(a => !a.acknowledged);

  return (
    <div className="flex-1 overflow-auto p-6 grid-bg">
      <div className="max-w-screen-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Alert Center</h1>
          <p className="text-muted-foreground">Monitor and manage system alerts and notifications</p>
        </div>

        {isLoading && (
          <Card className="glass-card">
            <CardContent className="p-6 text-center text-muted-foreground">
              Loading alerts...
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Unacknowledged</p>
                  <p className="text-2xl font-bold font-mono text-destructive counter pulse-glow">
                    {unacknowledged.length}
                  </p>
                </div>
                <Bell className="w-6 h-6 text-destructive" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Critical</p>
                  <p className="text-2xl font-bold font-mono text-destructive counter">
                    {criticalAlerts.length}
                  </p>
                </div>
                <XCircle className="w-6 h-6 text-destructive" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Warnings</p>
                  <p className="text-2xl font-bold font-mono text-yellow-500 counter">
                    {warningAlerts.length}
                  </p>
                </div>
                <AlertTriangle className="w-6 h-6 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Info</p>
                  <p className="text-2xl font-bold font-mono text-primary counter">
                    {infoAlerts.length}
                  </p>
                </div>
                <Info className="w-6 h-6 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="glass-card">
            <TabsTrigger value="all" data-testid="tab-all">All Alerts</TabsTrigger>
            <TabsTrigger value="unacknowledged" data-testid="tab-unacknowledged">
              Unacknowledged ({unacknowledged.length})
            </TabsTrigger>
            <TabsTrigger value="critical" data-testid="tab-critical">Critical</TabsTrigger>
            <TabsTrigger value="warning" data-testid="tab-warning">Warnings</TabsTrigger>
            <TabsTrigger value="info" data-testid="tab-info">Info</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="space-y-3">
              {alerts.map((alert) => {
                const Icon = getSeverityIcon(alert.severity);
                return (
                  <Card
                    key={alert.id}
                    className={`glass-card hover-elevate ${!alert.acknowledged ? "glow-accent" : ""}`}
                    data-testid={`card-alert-${alert.id.toLowerCase()}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-md flex items-center justify-center ${getSeverityColor(alert.severity)} ${!alert.acknowledged && alert.severity === "critical" ? "pulse-glow" : ""}`}>
                          <Icon className="w-5 h-5" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div>
                              <h3 className="text-base font-semibold text-card-foreground">{alert.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                            </div>
                            {!alert.acknowledged && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleAcknowledge(alert.id)}
                                data-testid={`button-ack-${alert.id.toLowerCase()}`}
                              >
                                <CheckCircle className="w-3 h-3 mr-2" />
                                Acknowledge
                              </Button>
                            )}
                            {alert.acknowledged && (
                              <Badge variant="secondary" className="whitespace-nowrap">
                                Acknowledged
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="font-mono">{alert.source}</span>
                            {alert.furnaceId && (
                              <Badge variant="outline" className="font-mono">
                                Furnace {alert.furnaceId}
                              </Badge>
                            )}
                            {alert.sensorId && (
                              <Badge variant="outline" className="font-mono">
                                Sensor {alert.sensorId}
                              </Badge>
                            )}
                            <span className="ml-auto font-mono">{formatTimeAgo(alert.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="unacknowledged" className="mt-6">
            <div className="space-y-3">
              {unacknowledged.map((alert) => {
                const Icon = getSeverityIcon(alert.severity);
                return (
                  <Card key={alert.id} className="glass-card hover-elevate glow-accent">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-md flex items-center justify-center ${getSeverityColor(alert.severity)} pulse-glow`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div>
                              <h3 className="text-base font-semibold text-card-foreground">{alert.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleAcknowledge(alert.id)}
                            >
                              <CheckCircle className="w-3 h-3 mr-2" />
                              Acknowledge
                            </Button>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="font-mono">{alert.source}</span>
                            <span className="ml-auto font-mono">{formatTimeAgo(alert.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="critical" className="mt-6">
            <div className="space-y-3">
              {criticalAlerts.map((alert) => {
                const Icon = getSeverityIcon(alert.severity);
                return (
                  <Card key={alert.id} className="glass-card hover-elevate">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-md flex items-center justify-center ${getSeverityColor(alert.severity)}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base font-semibold text-card-foreground">{alert.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                            <span className="font-mono">{alert.source}</span>
                            <span className="ml-auto font-mono">{formatTimeAgo(alert.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="warning" className="mt-6">
            <div className="space-y-3">
              {warningAlerts.map((alert) => {
                const Icon = getSeverityIcon(alert.severity);
                return (
                  <Card key={alert.id} className="glass-card hover-elevate">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-md flex items-center justify-center ${getSeverityColor(alert.severity)}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base font-semibold text-card-foreground">{alert.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                            <span className="font-mono">{alert.source}</span>
                            <span className="ml-auto font-mono">{formatTimeAgo(alert.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="info" className="mt-6">
            <div className="space-y-3">
              {infoAlerts.map((alert) => {
                const Icon = getSeverityIcon(alert.severity);
                return (
                  <Card key={alert.id} className="glass-card hover-elevate">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-md flex items-center justify-center ${getSeverityColor(alert.severity)}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base font-semibold text-card-foreground">{alert.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                            <span className="font-mono">{alert.source}</span>
                            <span className="ml-auto font-mono">{formatTimeAgo(alert.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

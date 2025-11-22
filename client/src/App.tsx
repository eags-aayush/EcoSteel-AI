import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Furnaces from "@/pages/furnaces";
import DigitalTwin from "@/pages/digital-twin";
import Sensors from "@/pages/sensors";
import Cameras from "@/pages/cameras";
import Analytics from "@/pages/analytics";
import Alerts from "@/pages/alerts";
import Settings from "@/pages/settings";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/furnaces" component={Furnaces} />
      <Route path="/digital-twin" component={DigitalTwin} />
      <Route path="/sensors" component={Sensors} />
      <Route path="/cameras" component={Cameras} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/alerts" component={Alerts} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <header className="flex items-center justify-between p-4 border-b border-border bg-background">
                <div className="flex items-center gap-4">
                  <SidebarTrigger data-testid="button-sidebar-toggle" />
                  <div>
                    <h2 className="text-sm font-semibold text-foreground">Steel Plant Monitoring</h2>
                    <p className="text-xs text-muted-foreground font-mono">Live System Status</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-accent pulse-glow" />
                    <span className="text-muted-foreground font-mono">System Online</span>
                  </div>
                </div>
              </header>
              <main className="flex-1 overflow-hidden">
                <Router />
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

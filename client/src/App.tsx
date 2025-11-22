import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import NotFound from "@/pages/not-found";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import Furnaces from "@/pages/furnaces";
import DigitalTwin from "@/pages/digital-twin";
import ScrapAI from "@/pages/scrap-ai";
import Emissions from "@/pages/emissions";
import Maintenance from "@/pages/maintenance";
import History from "@/pages/history";
import Reports from "@/pages/reports";
import ARGuide from "@/pages/ar-guide";
import MultiFurnace from "@/pages/multi-furnace";
import IoTSimulation from "@/pages/iot-simulation";
import Alerts from "@/pages/alerts";
import Settings from "@/pages/settings";

function Router() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/" component={Dashboard} />
      <Route path="/furnaces" component={Furnaces} />
      <Route path="/digital-twin" component={DigitalTwin} />
      <Route path="/scrap-ai" component={ScrapAI} />
      <Route path="/emissions" component={Emissions} />
      <Route path="/maintenance" component={Maintenance} />
      <Route path="/history" component={History} />
      <Route path="/reports" component={Reports} />
      <Route path="/ar-guide" component={ARGuide} />
      <Route path="/iot-simulation" component={IoTSimulation} />
      <Route path="/multi-furnace" component={MultiFurnace} />
      <Route path="/alerts" component={Alerts} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

// Login page wrapper to render without sidebar
function LoginPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Login />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
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
              <header className="flex items-center justify-between p-2 md:p-4 border-b border-border bg-background">
                <div className="flex items-center gap-2 md:gap-4">
                  <SidebarTrigger data-testid="button-sidebar-toggle" />
                  <div className="min-w-0">
                    <h2 className="text-xs md:text-sm font-semibold text-foreground truncate">Steel Plant Monitoring</h2>
                    <p className="text-xs text-muted-foreground font-mono hidden sm:block">Live System Status</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                    <div className="w-2 h-2 rounded-full bg-accent pulse-glow" />
                    <span className="text-muted-foreground font-mono hidden sm:inline">System Online</span>
                    <span className="text-muted-foreground font-mono sm:hidden">Online</span>
                  </div>
                </div>
              </header>
              <main className="flex-1 overflow-auto">
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

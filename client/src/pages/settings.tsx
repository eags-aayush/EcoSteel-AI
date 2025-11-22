import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";

export default function Settings() {
  return (
    <div className="flex-1 overflow-auto p-6 grid-bg">
      <div className="max-w-screen-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Configure system preferences and parameters</p>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-3">
              <SettingsIcon className="w-5 h-5" />
              System Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              Settings panel coming soon
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

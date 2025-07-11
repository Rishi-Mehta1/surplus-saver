import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Thermometer, Droplets, Truck, Zap, CheckCircle, X, Bell } from "lucide-react";

interface IoTAlert {
  id: string;
  type: "temperature" | "humidity" | "power" | "door";
  severity: "critical" | "warning" | "info";
  device: string;
  location: string;
  message: string;
  timestamp: string;
  affectedItems: string[];
  status: "active" | "acknowledged" | "resolved";
  reading?: {
    current: number;
    threshold: number;
    unit: string;
  };
}

const IoTAlertsPanel = () => {
  const [alerts, setAlerts] = useState<IoTAlert[]>([
    {
      id: "1",
      type: "temperature",
      severity: "critical",
      device: "Dairy Fridge #3",
      location: "Section B - Dairy",
      message: "Temperature above safe threshold for 15 minutes",
      timestamp: "2024-01-15T16:45:00",
      affectedItems: ["Milk Products", "Yogurt", "Cheese"],
      status: "active",
      reading: {
        current: 8.5,
        threshold: 4.0,
        unit: "°C"
      }
    },
    {
      id: "2",
      type: "humidity",
      severity: "warning",
      device: "Produce Cooler #1",
      location: "Produce Section",
      message: "Humidity levels fluctuating outside optimal range",
      timestamp: "2024-01-15T15:30:00",
      affectedItems: ["Leafy Greens", "Fresh Herbs", "Berries"],
      status: "acknowledged",
      reading: {
        current: 92,
        threshold: 85,
        unit: "%"
      }
    },
    {
      id: "3",
      type: "door",
      severity: "info",
      device: "Freezer Door #2",
      location: "Frozen Section",
      message: "Door left open for extended period",
      timestamp: "2024-01-15T14:20:00",
      affectedItems: ["Frozen Vegetables", "Ice Cream", "Frozen Meals"],
      status: "resolved"
    },
    {
      id: "4",
      type: "power",
      severity: "warning",
      device: "Backup Generator",
      location: "Store Infrastructure",
      message: "Running on backup power - grid connection unstable",
      timestamp: "2024-01-15T13:15:00",
      affectedItems: ["All Refrigerated Items"],
      status: "active"
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-destructive text-destructive-foreground";
      case "warning": return "bg-warning text-warning-foreground";
      case "info": return "bg-info text-info-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-destructive text-destructive-foreground";
      case "acknowledged": return "bg-warning text-warning-foreground";
      case "resolved": return "bg-success text-success-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "temperature": return <Thermometer className="h-4 w-4" />;
      case "humidity": return <Droplets className="h-4 w-4" />;
      case "power": return <Zap className="h-4 w-4" />;
      case "door": return <Truck className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const updateAlertStatus = (alertId: string, newStatus: IoTAlert["status"]) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, status: newStatus } : alert
    ));
  };

  const getAlertsByStatus = (status: string) => {
    return alerts.filter(alert => alert.status === status);
  };

  const getAlertsBySeverity = (severity: string) => {
    return alerts.filter(alert => alert.severity === severity);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">IoT Alerts & Monitoring</h2>
          <p className="text-muted-foreground">Real-time monitoring of store environmental conditions</p>
        </div>
        <Button className="bg-gradient-primary">
          <Bell className="h-4 w-4 mr-2" />
          Configure Alerts
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-destructive">{getAlertsBySeverity("critical").length}</p>
              <p className="text-sm text-muted-foreground">Critical Alerts</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">{getAlertsBySeverity("warning").length}</p>
              <p className="text-sm text-muted-foreground">Warnings</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{getAlertsByStatus("active").length}</p>
              <p className="text-sm text-muted-foreground">Active Alerts</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-success">{getAlertsByStatus("resolved").length}</p>
              <p className="text-sm text-muted-foreground">Resolved Today</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Critical Alerts Banner */}
      {getAlertsBySeverity("critical").length > 0 && (
        <Alert className="border-destructive bg-destructive/10">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <AlertDescription className="text-destructive font-medium">
            {getAlertsBySeverity("critical").length} critical alert(s) require immediate attention!
          </AlertDescription>
        </Alert>
      )}

      {/* Alerts Tabs */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Alerts ({getAlertsByStatus("active").length})</TabsTrigger>
          <TabsTrigger value="acknowledged">Acknowledged ({getAlertsByStatus("acknowledged").length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({getAlertsByStatus("resolved").length})</TabsTrigger>
          <TabsTrigger value="all">All Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="space-y-4">
            {getAlertsByStatus("active").map(alert => (
              <Card key={alert.id} className={`border-l-4 ${
                alert.severity === "critical" ? "border-l-destructive" : 
                alert.severity === "warning" ? "border-l-warning" : "border-l-info"
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getTypeIcon(alert.type)}
                        <h3 className="font-semibold text-foreground">{alert.device}</h3>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">{alert.location}</Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{alert.message}</p>
                      
                      {alert.reading && (
                        <div className="bg-muted/30 p-3 rounded-lg mb-3">
                          <div className="flex items-center justify-between text-sm">
                            <span>Current Reading:</span>
                            <span className={`font-bold ${
                              alert.severity === "critical" ? "text-destructive" : "text-warning"
                            }`}>
                              {alert.reading.current}{alert.reading.unit}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>Safe Threshold:</span>
                            <span>{alert.reading.threshold}{alert.reading.unit}</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground">
                          Affected Items: {alert.affectedItems.join(", ")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Time: {formatTime(alert.timestamp)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateAlertStatus(alert.id, "acknowledged")}
                      >
                        Acknowledge
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-success"
                        onClick={() => updateAlertStatus(alert.id, "resolved")}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Resolve
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="acknowledged">
          <div className="space-y-4">
            {getAlertsByStatus("acknowledged").map(alert => (
              <Card key={alert.id} className="opacity-75">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getTypeIcon(alert.type)}
                        <h3 className="font-semibold text-foreground">{alert.device}</h3>
                        <Badge className={getStatusColor(alert.status)}>ACKNOWLEDGED</Badge>
                        <Badge variant="outline">{alert.location}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>
                    </div>
                    
                    <Button 
                      size="sm" 
                      className="bg-success"
                      onClick={() => updateAlertStatus(alert.id, "resolved")}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Resolve
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resolved">
          <div className="space-y-4">
            {getAlertsByStatus("resolved").map(alert => (
              <Card key={alert.id} className="opacity-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getTypeIcon(alert.type)}
                        <h3 className="font-semibold text-foreground">{alert.device}</h3>
                        <Badge className={getStatusColor(alert.status)}>RESOLVED</Badge>
                        <Badge variant="outline">{alert.location}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Resolved at {formatTime(alert.timestamp)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all">
          <div className="space-y-4">
            {alerts.map(alert => (
              <Card key={alert.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getTypeIcon(alert.type)}
                        <h3 className="font-semibold text-foreground">{alert.device}</h3>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(alert.status)}>
                          {alert.status.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">{alert.location}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatTime(alert.timestamp)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IoTAlertsPanel;
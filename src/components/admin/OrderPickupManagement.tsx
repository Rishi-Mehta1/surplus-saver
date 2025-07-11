import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, User, MapPin, Phone, CheckCircle, XCircle, AlertCircle, Search } from "lucide-react";

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  bagName: string;
  pickupCode: string;
  reservedAt: string;
  pickupWindow: string;
  totalPrice: number;
  status: "reserved" | "ready" | "picked_up" | "no_show" | "cancelled";
  items: string[];
}

const OrderPickupManagement = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      customerName: "Priya Sharma",
      customerPhone: "+91 98765 43210",
      bagName: "Bakery Surprise Mix",
      pickupCode: "BK123X",
      reservedAt: "2024-01-15T14:30:00",
      pickupWindow: "16:00 - 19:00",
      totalPrice: 80,
      status: "reserved",
      items: ["Fresh Bread", "Pastries", "Cookies"]
    },
    {
      id: "2",
      customerName: "Raj Patel",
      customerPhone: "+91 87654 32109",
      bagName: "Fresh Produce Bundle",
      pickupCode: "PR456Y",
      reservedAt: "2024-01-15T15:45:00",
      pickupWindow: "17:00 - 20:00",
      totalPrice: 60,
      status: "ready",
      items: ["Seasonal Fruits", "Vegetables", "Herbs"]
    },
    {
      id: "3",
      customerName: "Anjali Gupta",
      customerPhone: "+91 76543 21098",
      bagName: "Deli Special",
      pickupCode: "DL789Z",
      reservedAt: "2024-01-14T16:20:00",
      pickupWindow: "18:00 - 21:00",
      totalPrice: 120,
      status: "no_show",
      items: ["Sandwiches", "Salads", "Snacks"]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "reserved": return "bg-warning text-warning-foreground";
      case "ready": return "bg-success text-success-foreground";
      case "picked_up": return "bg-primary text-primary-foreground";
      case "no_show": return "bg-destructive text-destructive-foreground";
      case "cancelled": return "bg-muted text-muted-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "reserved": return <Clock className="h-4 w-4" />;
      case "ready": return <CheckCircle className="h-4 w-4" />;
      case "picked_up": return <CheckCircle className="h-4 w-4" />;
      case "no_show": return <XCircle className="h-4 w-4" />;
      case "cancelled": return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.pickupCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.bagName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getOrdersByStatus = (status: string) => {
    return orders.filter(order => order.status === status);
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Order & Pickup Management</h2>
          <p className="text-muted-foreground">Track customer reservations and pickup status</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">{getOrdersByStatus("reserved").length}</p>
              <p className="text-sm text-muted-foreground">Reserved</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-success">{getOrdersByStatus("ready").length}</p>
              <p className="text-sm text-muted-foreground">Ready</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{getOrdersByStatus("picked_up").length}</p>
              <p className="text-sm text-muted-foreground">Picked Up</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-destructive">{getOrdersByStatus("no_show").length}</p>
              <p className="text-sm text-muted-foreground">No Shows</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">₹{orders.reduce((sum, order) => sum + order.totalPrice, 0)}</p>
              <p className="text-sm text-muted-foreground">Total Value</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by customer, code, or bag name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="reserved">Reserved</SelectItem>
            <SelectItem value="ready">Ready</SelectItem>
            <SelectItem value="picked_up">Picked Up</SelectItem>
            <SelectItem value="no_show">No Show</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders Tabs */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Orders</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Reservations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredOrders.filter(order => ["reserved", "ready"].includes(order.status)).map(order => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-foreground">{order.customerName}</h3>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1">{order.status.replace("_", " ").toUpperCase()}</span>
                        </Badge>
                        <Badge variant="outline">Code: {order.pickupCode}</Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {order.bagName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Pickup: {order.pickupWindow}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {order.customerPhone}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {order.items.map(item => (
                          <Badge key={item} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold text-foreground">₹{order.totalPrice}</p>
                        <p className="text-xs text-muted-foreground">Reserved at {formatTime(order.reservedAt)}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        {order.status === "reserved" && (
                          <Button 
                            size="sm" 
                            className="bg-success"
                            onClick={() => updateOrderStatus(order.id, "ready")}
                          >
                            Mark Ready
                          </Button>
                        )}
                        {order.status === "ready" && (
                          <Button 
                            size="sm" 
                            className="bg-primary"
                            onClick={() => updateOrderStatus(order.id, "picked_up")}
                          >
                            Confirm Pickup
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, "cancelled")}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredOrders.filter(order => order.status === "picked_up").map(order => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg opacity-75">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-foreground">{order.customerName}</h3>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1">COMPLETED</span>
                        </Badge>
                        <Badge variant="outline">{order.bagName}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">₹{order.totalPrice} • Code: {order.pickupCode}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issues">
          <Card>
            <CardHeader>
              <CardTitle>Issues & No-Shows</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredOrders.filter(order => ["no_show", "cancelled"].includes(order.status)).map(order => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg bg-destructive/5">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-foreground">{order.customerName}</h3>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1">{order.status.replace("_", " ").toUpperCase()}</span>
                        </Badge>
                        <Badge variant="outline">{order.bagName}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">₹{order.totalPrice} • Code: {order.pickupCode}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Re-list Items
                      </Button>
                      <Button variant="outline" size="sm">
                        Contact Customer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrderPickupManagement;
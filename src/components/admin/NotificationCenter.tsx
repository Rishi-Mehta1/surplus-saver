import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Send, AlertTriangle, Clock, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

// Demo data
const initialNotifications = [
  { id: 1, type: "Info", message: "New surprise bags available!", audience: "All Users", status: "Sent", date: "2024-01-15" },
  { id: 2, type: "Alert", message: "Pickup window extended for today.", audience: "Customers", status: "Sent", date: "2024-01-14" },
  { id: 3, type: "Reminder", message: "Don't forget to pick up your reserved bag.", audience: "Customers", status: "Scheduled", date: "2024-01-16" },
  { id: 4, type: "Error", message: "Failed to send notification to staff.", audience: "Staff", status: "Error", date: "2024-01-13" },
  { id: 5, type: "Info", message: "Donation event this weekend!", audience: "All Users", status: "Sent", date: "2024-01-12" },
];

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("all");
  const [newNotif, setNewNotif] = useState({ type: "Info", audience: "All Users", message: "" });
  const [successMsg, setSuccessMsg] = useState("");

  // Summary
  const sent = notifications.filter(n => n.status === "Sent").length;
  const scheduled = notifications.filter(n => n.status === "Scheduled").length;
  const errors = notifications.filter(n => n.status === "Error").length;
  const total = notifications.length;

  // Filtered notifications
  const filteredNotifications = filter === "all" ? notifications : notifications.filter(n => n.status === filter);

  // Send notification (demo)
  const handleSend = () => {
    if (!newNotif.message) return;
    setNotifications([
      { id: notifications.length + 1, ...newNotif, status: "Sent", date: new Date().toISOString().slice(0, 10) },
      ...notifications
    ]);
    setNewNotif({ type: "Info", audience: "All Users", message: "" });
    setSuccessMsg("Notification sent!");
    setTimeout(() => setSuccessMsg(""), 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Notification Center</h2>
        <p className="text-muted-foreground">Manage alerts and notifications</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <Bell className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Total Sent</p>
              <p className="text-2xl font-bold text-primary">{sent}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <Clock className="h-8 w-8 text-warning" />
            <div>
              <p className="text-sm text-muted-foreground">Scheduled</p>
              <p className="text-2xl font-bold text-warning">{scheduled}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <AlertTriangle className="h-8 w-8 text-destructive" />
            <div>
              <p className="text-sm text-muted-foreground">Errors</p>
              <p className="text-2xl font-bold text-destructive">{errors}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <Users className="h-8 w-8 text-success" />
            <div>
              <p className="text-sm text-muted-foreground">Total Notifications</p>
              <p className="text-2xl font-bold text-success">{total}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-2">
        <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>All</Button>
        <Button variant={filter === "Sent" ? "default" : "outline"} onClick={() => setFilter("Sent")}><CheckCircle className="h-4 w-4 mr-1 text-primary" /> Sent</Button>
        <Button variant={filter === "Scheduled" ? "default" : "outline"} onClick={() => setFilter("Scheduled")}><Clock className="h-4 w-4 mr-1 text-warning" /> Scheduled</Button>
        <Button variant={filter === "Error" ? "default" : "outline"} onClick={() => setFilter("Error")}><AlertTriangle className="h-4 w-4 mr-1 text-destructive" /> Error</Button>
      </div>

      {/* Notifications Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Recent Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Type</th>
                  <th className="p-2 text-left">Audience</th>
                  <th className="p-2 text-left">Message</th>
                  <th className="p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredNotifications.map((n) => (
                  <tr key={n.id} className="border-b hover:bg-muted/30">
                    <td className="p-2">{n.date}</td>
                    <td className="p-2">{n.type}</td>
                    <td className="p-2">{n.audience}</td>
                    <td className="p-2">{n.message}</td>
                    <td className="p-2">
                      {n.status === "Sent" && <span className="text-primary">Sent</span>}
                      {n.status === "Scheduled" && <span className="text-warning">Scheduled</span>}
                      {n.status === "Error" && <span className="text-destructive">Error</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {successMsg && <div className="text-green-600 flex items-center gap-1 mt-2"><Send className="h-4 w-4" /> {successMsg}</div>}
          </div>
        </CardContent>
      </Card>

      {/* Send Notification Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5 text-primary" />
            Send New Notification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 md:flex-row md:items-end">
            <div className="flex flex-col gap-2 w-full md:w-1/4">
              <label className="text-xs font-medium">Type</label>
              <select className="border rounded p-2" value={newNotif.type} onChange={e => setNewNotif({ ...newNotif, type: e.target.value })}>
                <option>Info</option>
                <option>Alert</option>
                <option>Reminder</option>
                <option>Error</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 w-full md:w-1/4">
              <label className="text-xs font-medium">Audience</label>
              <select className="border rounded p-2" value={newNotif.audience} onChange={e => setNewNotif({ ...newNotif, audience: e.target.value })}>
                <option>All Users</option>
                <option>Customers</option>
                <option>Staff</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 w-full md:w-2/4">
              <label className="text-xs font-medium">Message</label>
              <Input
                placeholder="Type your notification message..."
                value={newNotif.message}
                onChange={e => setNewNotif({ ...newNotif, message: e.target.value })}
              />
            </div>
            <Button className="bg-gradient-primary mt-2 md:mt-0 md:ml-2" onClick={handleSend}>
              <Send className="h-4 w-4 mr-1" /> Send
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationCenter;
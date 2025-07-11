import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, Shield, Clock, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

// Demo data
const initialStaff = [
  { id: 1, name: "Aarav Kumar", email: "aarav@walmart.com", role: "Manager", status: "Active", lastLogin: "2024-01-15 09:30" },
  { id: 2, name: "Priya Sharma", email: "priya@walmart.com", role: "Staff", status: "Active", lastLogin: "2024-01-15 10:10" },
  { id: 3, name: "Raj Patel", email: "raj@walmart.com", role: "Staff", status: "Inactive", lastLogin: "2024-01-10 16:45" },
  { id: 4, name: "Riya Mehta", email: "riya@walmart.com", role: "Admin", status: "Active", lastLogin: "2024-01-14 12:00" },
  { id: 5, name: "Kabir Singh", email: "kabir@walmart.com", role: "Invited", status: "Pending", lastLogin: "-" },
];

const StaffAccessManagement = () => {
  const [staff, setStaff] = useState(initialStaff);
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [newStaff, setNewStaff] = useState({ name: "", email: "", role: "Staff" });
  const [successMsg, setSuccessMsg] = useState("");

  // Summary
  const total = staff.length;
  const roles = Array.from(new Set(staff.map(s => s.role))).length;
  const pending = staff.filter(s => s.status === "Pending").length;
  const lastLogin = staff.reduce((latest, s) => s.lastLogin > latest ? s.lastLogin : latest, "");

  // Filtered staff
  const filteredStaff = staff.filter(s =>
    (filterRole === "all" || s.role === filterRole) &&
    (filterStatus === "all" || s.status === filterStatus)
  );

  // Add new staff (demo)
  const handleAdd = () => {
    if (!newStaff.name || !newStaff.email) return;
    setStaff([
      ...staff,
      { id: staff.length + 1, ...newStaff, status: "Pending", lastLogin: "-" }
    ]);
    setNewStaff({ name: "", email: "", role: "Staff" });
    setSuccessMsg("Invite sent!");
    setTimeout(() => setSuccessMsg(""), 1500);
  };

  // Edit role/status (demo)
  const handleRoleChange = (id, role) => {
    setStaff(staff.map(s => s.id === id ? { ...s, role } : s));
  };
  const handleStatusChange = (id, status) => {
    setStaff(staff.map(s => s.id === id ? { ...s, status } : s));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Staff Access Management</h2>
        <p className="text-muted-foreground">Manage user roles and permissions</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Total Staff</p>
              <p className="text-2xl font-bold text-primary">{total}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <Shield className="h-8 w-8 text-success" />
            <div>
              <p className="text-sm text-muted-foreground">Roles</p>
              <p className="text-2xl font-bold text-success">{roles}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <UserPlus className="h-8 w-8 text-warning" />
            <div>
              <p className="text-sm text-muted-foreground">Pending Invites</p>
              <p className="text-2xl font-bold text-warning">{pending}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <Clock className="h-8 w-8 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Last Login</p>
              <p className="text-2xl font-bold text-muted-foreground">{lastLogin}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-2">
        <select className="border rounded p-2" value={filterRole} onChange={e => setFilterRole(e.target.value)}>
          <option value="all">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Staff">Staff</option>
          <option value="Invited">Invited</option>
        </select>
        <select className="border rounded p-2" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="all">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* Staff Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Staff List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Role</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Last Login</th>
                  <th className="p-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map((s) => (
                  <tr key={s.id} className="border-b hover:bg-muted/30">
                    <td className="p-2">{s.name}</td>
                    <td className="p-2">{s.email}</td>
                    <td className="p-2">
                      <select className="border rounded p-1" value={s.role} onChange={e => handleRoleChange(s.id, e.target.value)}>
                        <option>Admin</option>
                        <option>Manager</option>
                        <option>Staff</option>
                        <option>Invited</option>
                      </select>
                    </td>
                    <td className="p-2">
                      <select className="border rounded p-1" value={s.status} onChange={e => handleStatusChange(s.id, e.target.value)}>
                        <option>Active</option>
                        <option>Inactive</option>
                        <option>Pending</option>
                      </select>
                    </td>
                    <td className="p-2">{s.lastLogin}</td>
                    <td className="p-2">
                      {s.status === "Active" && <CheckCircle className="h-4 w-4 text-success" />}
                      {s.status === "Inactive" && <XCircle className="h-4 w-4 text-destructive" />}
                      {s.status === "Pending" && <UserPlus className="h-4 w-4 text-warning" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Staff/Invite Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            Add Staff / Send Invite
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 md:flex-row md:items-end">
            <Input
              placeholder="Name"
              value={newStaff.name}
              onChange={e => setNewStaff({ ...newStaff, name: e.target.value })}
              className="w-full md:w-1/4"
            />
            <Input
              placeholder="Email"
              value={newStaff.email}
              onChange={e => setNewStaff({ ...newStaff, email: e.target.value })}
              className="w-full md:w-1/4"
            />
            <select className="border rounded p-2 w-full md:w-1/4" value={newStaff.role} onChange={e => setNewStaff({ ...newStaff, role: e.target.value })}>
              <option>Staff</option>
              <option>Manager</option>
              <option>Admin</option>
            </select>
            <Button className="bg-gradient-primary mt-2 md:mt-0 md:ml-2" onClick={handleAdd}>
              <UserPlus className="h-4 w-4 mr-1" /> Send Invite
            </Button>
          </div>
          {successMsg && <div className="text-green-600 flex items-center gap-1 mt-2"><CheckCircle className="h-4 w-4" /> {successMsg}</div>}
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffAccessManagement;
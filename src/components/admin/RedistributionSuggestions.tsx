import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, CheckCircle, XCircle, AlertTriangle, ArrowRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

// Demo data
const initialSuggestions = [
  { id: 1, from: "Mumbai Supercenter", to: "Delhi Hypermart", items: ["Bakery Loaves", "Bananas"], urgency: "High", impact: "12kg waste reduced", status: "Pending" },
  { id: 2, from: "Hyderabad Greens", to: "Bengaluru Freshmart", items: ["Leafy Greens"], urgency: "Medium", impact: "5kg waste reduced", status: "Accepted" },
  { id: 3, from: "Delhi Hypermart", to: "Mumbai Supercenter", items: ["Packaged Sandwiches"], urgency: "Low", impact: "2kg waste reduced", status: "Completed" },
  { id: 4, from: "Bengaluru Freshmart", to: "Hyderabad Greens", items: ["Dairy Products"], urgency: "High", impact: "8kg waste reduced", status: "Rejected" },
];

const RedistributionSuggestions = () => {
  const [suggestions, setSuggestions] = useState(initialSuggestions);
  const [filter, setFilter] = useState("all");
  const [successMsg, setSuccessMsg] = useState("");

  // Summary
  const total = suggestions.length;
  const completed = suggestions.filter(s => s.status === "Completed").length;
  const wasteReduced = suggestions.reduce((sum, s) => sum + (s.status === "Completed" ? parseInt(s.impact) : 0), 0);

  // Filtered suggestions
  const filteredSuggestions = filter === "all" ? suggestions : suggestions.filter(s => s.status === filter);

  // Accept/Reject (demo)
  const handleStatus = (id, status) => {
    setSuggestions(suggestions.map(s => s.id === id ? { ...s, status } : s));
    setSuccessMsg(`Suggestion ${status.toLowerCase()}!`);
    setTimeout(() => setSuccessMsg(""), 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Redistribution Suggestions</h2>
        <p className="text-muted-foreground">AI-powered transfer recommendations</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <Truck className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Total Suggestions</p>
              <p className="text-2xl font-bold text-primary">{total}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <CheckCircle className="h-8 w-8 text-success" />
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold text-success">{completed}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <AlertTriangle className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-muted-foreground">Waste Reduced</p>
              <p className="text-2xl font-bold text-green-700">{wasteReduced}kg</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-2">
        <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>All</Button>
        <Button variant={filter === "Pending" ? "default" : "outline"} onClick={() => setFilter("Pending")}><RefreshCw className="h-4 w-4 mr-1 text-primary" /> Pending</Button>
        <Button variant={filter === "Accepted" ? "default" : "outline"} onClick={() => setFilter("Accepted")}><CheckCircle className="h-4 w-4 mr-1 text-success" /> Accepted</Button>
        <Button variant={filter === "Rejected" ? "default" : "outline"} onClick={() => setFilter("Rejected")}><XCircle className="h-4 w-4 mr-1 text-destructive" /> Rejected</Button>
        <Button variant={filter === "Completed" ? "default" : "outline"} onClick={() => setFilter("Completed")}><CheckCircle className="h-4 w-4 mr-1 text-green-700" /> Completed</Button>
      </div>

      {/* Suggestions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-primary" />
            AI Redistribution Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">From</th>
                  <th className="p-2 text-left">To</th>
                  <th className="p-2 text-left">Items</th>
                  <th className="p-2 text-left">Urgency</th>
                  <th className="p-2 text-left">Impact</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredSuggestions.map((s) => (
                  <tr key={s.id} className="border-b hover:bg-muted/30">
                    <td className="p-2">{s.from}</td>
                    <td className="p-2 flex items-center gap-1">{s.to} <ArrowRight className="h-4 w-4 text-muted-foreground" /></td>
                    <td className="p-2">{s.items.join(", ")}</td>
                    <td className="p-2">{s.urgency}</td>
                    <td className="p-2">{s.impact}</td>
                    <td className="p-2">
                      {s.status === "Pending" && <span className="text-primary">Pending</span>}
                      {s.status === "Accepted" && <span className="text-success">Accepted</span>}
                      {s.status === "Rejected" && <span className="text-destructive">Rejected</span>}
                      {s.status === "Completed" && <span className="text-green-700">Completed</span>}
                    </td>
                    <td className="p-2 flex gap-1">
                      {s.status === "Pending" && <>
                        <Button size="sm" className="bg-success/80" onClick={() => handleStatus(s.id, "Accepted")}>Accept</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleStatus(s.id, "Rejected")}>Reject</Button>
                      </>}
                      {s.status === "Accepted" && <Button size="sm" className="bg-green-700/80" onClick={() => handleStatus(s.id, "Completed")}>Mark Completed</Button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {successMsg && <div className="text-green-600 flex items-center gap-1 mt-2"><CheckCircle className="h-4 w-4" /> {successMsg}</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RedistributionSuggestions;
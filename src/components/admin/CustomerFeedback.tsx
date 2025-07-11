import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Star, ThumbsUp, ThumbsDown, Smile, Frown, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

// Demo data
const initialFeedback = [
  { id: 1, name: "Priya Sharma", rating: 5, comment: "Loved the surprise bag! Super fresh.", date: "2024-01-15", status: "positive" },
  { id: 2, name: "Raj Patel", rating: 4, comment: "Great value, but pickup was a bit slow.", date: "2024-01-14", status: "neutral" },
  { id: 3, name: "Anjali Gupta", rating: 2, comment: "Some items were not as fresh as expected.", date: "2024-01-13", status: "negative" },
  { id: 4, name: "Kabir Singh", rating: 5, comment: "Amazing initiative! Will buy again.", date: "2024-01-12", status: "positive" },
  { id: 5, name: "Riya Mehta", rating: 3, comment: "Decent, but could use more variety.", date: "2024-01-11", status: "neutral" },
];

const CustomerFeedback = () => {
  const [feedback, setFeedback] = useState(initialFeedback);
  const [filter, setFilter] = useState("all");
  const [reply, setReply] = useState({ id: null, text: "" });
  const [successMsg, setSuccessMsg] = useState("");

  // Summary
  const total = feedback.length;
  const avgRating = (feedback.reduce((sum, f) => sum + f.rating, 0) / total).toFixed(1);
  const positive = feedback.filter(f => f.status === "positive").length;
  const negative = feedback.filter(f => f.status === "negative").length;

  // Filtered feedback
  const filteredFeedback = filter === "all" ? feedback : feedback.filter(f => f.status === filter);

  // Handle reply
  const handleReply = (id) => {
    if (!reply.text) return;
    setSuccessMsg("Reply sent!");
    setTimeout(() => setSuccessMsg(""), 1500);
    setReply({ id: null, text: "" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Customer Feedback</h2>
        <p className="text-muted-foreground">View and respond to customer reviews</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <MessageSquare className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Total Feedback</p>
              <p className="text-2xl font-bold text-primary">{total}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <Star className="h-8 w-8 text-yellow-400" />
            <div>
              <p className="text-sm text-muted-foreground">Avg. Rating</p>
              <p className="text-2xl font-bold text-yellow-500">{avgRating}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <ThumbsUp className="h-8 w-8 text-success" />
            <div>
              <p className="text-sm text-muted-foreground">Positive</p>
              <p className="text-2xl font-bold text-success">{positive}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <ThumbsDown className="h-8 w-8 text-destructive" />
            <div>
              <p className="text-sm text-muted-foreground">Negative</p>
              <p className="text-2xl font-bold text-destructive">{negative}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-2">
        <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>All</Button>
        <Button variant={filter === "positive" ? "default" : "outline"} onClick={() => setFilter("positive")}><Smile className="h-4 w-4 mr-1" /> Positive</Button>
        <Button variant={filter === "neutral" ? "default" : "outline"} onClick={() => setFilter("neutral")}><Star className="h-4 w-4 mr-1 text-yellow-400" /> Neutral</Button>
        <Button variant={filter === "negative" ? "default" : "outline"} onClick={() => setFilter("negative")}><Frown className="h-4 w-4 mr-1 text-destructive" /> Negative</Button>
      </div>

      {/* Feedback Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Recent Feedback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Customer</th>
                  <th className="p-2 text-left">Rating</th>
                  <th className="p-2 text-left">Comment</th>
                  <th className="p-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredFeedback.map((f) => (
                  <tr key={f.id} className="border-b hover:bg-muted/30">
                    <td className="p-2">{f.date}</td>
                    <td className="p-2">{f.name}</td>
                    <td className="p-2 flex items-center gap-1">
                      {[...Array(f.rating)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-400" />)}
                    </td>
                    <td className="p-2">{f.comment}</td>
                    <td className="p-2">
                      {reply.id === f.id ? (
                        <div className="flex gap-1">
                          <Input
                            placeholder="Type reply..."
                            value={reply.text}
                            onChange={e => setReply({ id: f.id, text: e.target.value })}
                            className="w-32"
                          />
                          <Button size="sm" onClick={() => handleReply(f.id)}><Send className="h-4 w-4" /></Button>
                        </div>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => setReply({ id: f.id, text: "" })}>Reply</Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {successMsg && <div className="text-green-600 flex items-center gap-1 mt-2"><Send className="h-4 w-4" /> {successMsg}</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerFeedback;
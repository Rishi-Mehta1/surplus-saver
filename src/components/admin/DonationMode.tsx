import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, Users, Leaf, Plus, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

// Demo data
const initialPartners = [
  { id: 1, name: "Food Bank Mumbai", contact: "contact@fbm.org", donations: 120 },
  { id: 2, name: "Delhi Meals Mission", contact: "info@dmm.org", donations: 80 },
  { id: 3, name: "Hyderabad Hope", contact: "hello@hh.org", donations: 60 },
];
const initialDonations = [
  { id: 1, date: "2024-01-15", partner: "Food Bank Mumbai", items: 30, meals: 90, impact: "27kg CO₂ saved" },
  { id: 2, date: "2024-01-14", partner: "Delhi Meals Mission", items: 20, meals: 60, impact: "18kg CO₂ saved" },
  { id: 3, date: "2024-01-13", partner: "Hyderabad Hope", items: 15, meals: 45, impact: "13kg CO₂ saved" },
];

const DonationMode = () => {
  const [partners, setPartners] = useState(initialPartners);
  const [donations, setDonations] = useState(initialDonations);
  const [newPartner, setNewPartner] = useState({ name: "", contact: "" });
  const [newDonation, setNewDonation] = useState({ partner: "", items: "", meals: "" });
  const [successMsg, setSuccessMsg] = useState("");

  // Summary
  const totalItems = donations.reduce((sum, d) => sum + d.items, 0);
  const totalMeals = donations.reduce((sum, d) => sum + d.meals, 0);
  const totalPartners = partners.length;
  const totalImpact = donations.reduce((sum, d) => sum + parseInt(d.impact), 0) || 0;

  // Add new partner
  const handleAddPartner = () => {
    if (!newPartner.name || !newPartner.contact) return;
    setPartners([...partners, { id: partners.length + 1, name: newPartner.name, contact: newPartner.contact, donations: 0 }]);
    setNewPartner({ name: "", contact: "" });
    setSuccessMsg("Partner added!");
    setTimeout(() => setSuccessMsg(""), 1500);
  };

  // Add new donation
  const handleAddDonation = () => {
    if (!newDonation.partner || !newDonation.items || !newDonation.meals) return;
    setDonations([
      { id: donations.length + 1, date: new Date().toISOString().slice(0, 10), partner: newDonation.partner, items: parseInt(newDonation.items), meals: parseInt(newDonation.meals), impact: `${Math.round(parseInt(newDonation.items) * 0.9)}kg CO₂ saved` },
      ...donations
    ]);
    setNewDonation({ partner: "", items: "", meals: "" });
    setSuccessMsg("Donation recorded!");
    setTimeout(() => setSuccessMsg(""), 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Donation Mode</h2>
        <p className="text-muted-foreground">Manage charitable donations and partnerships</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <Gift className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Items Donated</p>
              <p className="text-2xl font-bold text-primary">{totalItems}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <Users className="h-8 w-8 text-success" />
            <div>
              <p className="text-sm text-muted-foreground">Partners</p>
              <p className="text-2xl font-bold text-success">{totalPartners}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <Gift className="h-8 w-8 text-warning" />
            <div>
              <p className="text-sm text-muted-foreground">Meals Provided</p>
              <p className="text-2xl font-bold text-warning">{totalMeals}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <Leaf className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-muted-foreground">CO₂ Impact</p>
              <p className="text-2xl font-bold text-green-700">{totalImpact}kg</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Partners List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-success" />
            Donation Partners
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {partners.map((p) => (
              <div key={p.id} className="border rounded-lg p-3 min-w-[180px] flex flex-col items-start bg-muted/30">
                <div className="font-semibold">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.contact}</div>
                <div className="text-xs mt-1">Donations: {p.donations}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Donations Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            Recent Donations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Partner</th>
                  <th className="p-2 text-left">Items</th>
                  <th className="p-2 text-left">Meals</th>
                  <th className="p-2 text-left">Impact</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((d) => (
                  <tr key={d.id} className="border-b hover:bg-muted/30">
                    <td className="p-2">{d.date}</td>
                    <td className="p-2">{d.partner}</td>
                    <td className="p-2">{d.items}</td>
                    <td className="p-2">{d.meals}</td>
                    <td className="p-2">{d.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add New Partner & Donation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-success" />
              Add New Partner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Input
                placeholder="Partner Name"
                value={newPartner.name}
                onChange={e => setNewPartner({ ...newPartner, name: e.target.value })}
              />
              <Input
                placeholder="Contact Email"
                value={newPartner.contact}
                onChange={e => setNewPartner({ ...newPartner, contact: e.target.value })}
              />
              <Button className="bg-gradient-primary mt-2" onClick={handleAddPartner}>
                Add Partner
              </Button>
              {successMsg === "Partner added!" && <div className="text-green-600 flex items-center gap-1 mt-1"><CheckCircle className="h-4 w-4" /> Partner added!</div>}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Record New Donation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Input
                placeholder="Partner Name"
                value={newDonation.partner}
                onChange={e => setNewDonation({ ...newDonation, partner: e.target.value })}
                list="partner-list"
              />
              <datalist id="partner-list">
                {partners.map(p => <option key={p.id} value={p.name} />)}
              </datalist>
              <Input
                placeholder="Items Donated"
                type="number"
                value={newDonation.items}
                onChange={e => setNewDonation({ ...newDonation, items: e.target.value })}
              />
              <Input
                placeholder="Meals Provided"
                type="number"
                value={newDonation.meals}
                onChange={e => setNewDonation({ ...newDonation, meals: e.target.value })}
              />
              <Button className="bg-gradient-primary mt-2" onClick={handleAddDonation}>
                Record Donation
              </Button>
              {successMsg === "Donation recorded!" && <div className="text-green-600 flex items-center gap-1 mt-1"><CheckCircle className="h-4 w-4" /> Donation recorded!</div>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DonationMode;
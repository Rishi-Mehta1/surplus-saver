import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function AdminAnalytics() {
  const [totalBags, setTotalBags] = useState(0);
  const [totalFoodSaved, setTotalFoodSaved] = useState(0);
  const [topStores, setTopStores] = useState<any[]>([]);
  const [recentReservations, setRecentReservations] = useState<any[]>([]);
  const [recentEvents, setRecentEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      // Total bags reserved
      const { data: reservations } = await supabase.from('reservations').select('id, surplus_bag_id, created_at').order('created_at', { ascending: false });
      setTotalBags(reservations?.length || 0);
      // Total food saved (assume 1 bag = 2kg food for demo)
      setTotalFoodSaved((reservations?.length || 0) * 2);
      // Top stores by reservations
      const { data: stores } = await supabase.from('stores').select('id, name');
      const storeCounts: Record<string, number> = {};
      reservations?.forEach((r: any) => {
        storeCounts[r.surplus_bag_id] = (storeCounts[r.surplus_bag_id] || 0) + 1;
      });
      const top = Object.entries(storeCounts)
        .map(([id, count]) => ({ id, count, name: stores?.find((s: any) => s.id === id)?.name || id }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
      setTopStores(top);
      // Recent reservations
      setRecentReservations(reservations?.slice(0, 10) || []);
      // Recent analytics events
      const { data: events } = await supabase.from('analytics_events').select('*').order('created_at', { ascending: false }).limit(10);
      setRecentEvents(events || []);
      setLoading(false);
    };
    fetchAnalytics();
  }, []);

  const handleRestock = async () => {
    // Fetch all surplus bags
    const { data: bags, error: fetchError } = await supabase.from('surplus_bags').select('id');
    if (fetchError) {
      toast({ title: 'Restock failed', description: fetchError.message, variant: 'destructive' });
      return;
    }
    // Update each bag to have 5 items_left
    let updateError = null;
    for (const bag of bags || []) {
      const { error } = await supabase.from('surplus_bags').update({ items_left: 5 }).eq('id', bag.id);
      if (error) updateError = error;
    }
    if (!updateError) {
      toast({ title: 'All bags restocked!', description: 'Each surplus bag now has 5 items left.' });
      fetchAnalytics();
    } else {
      toast({ title: 'Restock failed', description: updateError.message, variant: 'destructive' });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin Analytics Dashboard</h1>
        <Button onClick={handleRestock} variant="outline">Restock All Bags</Button>
      </div>
      {loading ? (
        <div className="text-center py-12 text-lg text-muted-foreground">Loading analytics...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Bags Reserved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-700">{totalBags}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Food Saved (kg)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-700">{totalFoodSaved}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Top Stores</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {topStores.map((s) => (
                  <li key={s.id} className="flex justify-between">
                    <span>{s.name}</span>
                    <span className="font-semibold text-green-600">{s.count}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Reservations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm divide-y">
              {recentReservations.map((r) => (
                <li key={r.id} className="py-2 flex justify-between">
                  <span>Bag: {r.surplus_bag_id}</span>
                  <span className="text-zinc-500">{new Date(r.created_at).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Analytics Events</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm divide-y">
              {recentEvents.map((e) => (
                <li key={e.id} className="py-2 flex flex-col">
                  <span className="font-semibold">{e.event}</span>
                  <span className="text-xs text-zinc-500">{new Date(e.created_at).toLocaleString()}</span>
                  <span className="text-xs text-zinc-400">{JSON.stringify(e.details)}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
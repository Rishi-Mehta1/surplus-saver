import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, location, preferences, weather } = await req.json();

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch current surplus bags
    const { data: surplusBags, error } = await supabase
      .from('surplus_bags')
      .select(`
        *,
        stores (
          name,
          address,
          latitude,
          longitude
        )
      `)
      .eq('is_active', true)
      .gt('items_left', 0);

    if (error) {
      console.error('Error fetching surplus bags:', error);
      throw error;
    }

    // Prepare data for AI analysis
    const bagsForAI = surplusBags?.map(bag => ({
      category: bag.category,
      originalPrice: bag.original_price,
      salePrice: bag.sale_price,
      itemsLeft: bag.items_left,
      store: bag.stores?.name,
      location: bag.stores?.address
    })) || [];

    // Get AI recommendations
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an AI assistant for Walmart Surplus Saver, helping users find the best food deals based on their preferences and current conditions. 
            Analyze the available surplus bags and provide personalized recommendations considering:
            1. User preferences and dietary needs
            2. Weather conditions (suggest comfort foods for cold/rainy weather, fresh items for hot weather)
            3. Value for money (discount percentage)
            4. Urgency (fewer items left = higher priority)
            
            Return your response as a JSON object with:
            - recommendations: array of recommended bag categories with reasons
            - weatherTip: one sentence about how weather affects food choices today
            - urgentDeals: categories that are running low on items`
          },
          {
            role: 'user',
            content: `Current surplus bags: ${JSON.stringify(bagsForAI)}
            User location: ${location || 'Not specified'}
            User preferences: ${preferences || 'No specific preferences'}
            Weather: ${weather || 'Not specified'}
            
            Provide personalized recommendations in JSON format.`
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      }),
    });

    const aiData = await response.json();
    const aiRecommendations = JSON.parse(aiData.choices[0].message.content);

    return new Response(JSON.stringify({
      recommendations: aiRecommendations,
      availableBags: surplusBags
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-recommendations function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      recommendations: {
        recommendations: [],
        weatherTip: "Check out our available surplus bags to save money and reduce food waste!",
        urgentDeals: []
      }
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
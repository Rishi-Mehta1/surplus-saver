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
    const { storeId, category, currentStock, historicalData } = await req.json();

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get historical surplus data for this store and category
    const { data: historicalBags, error } = await supabase
      .from('surplus_bags')
      .select('*')
      .eq('store_id', storeId)
      .eq('category', category)
      .order('created_at', { ascending: false })
      .limit(30);

    if (error) {
      console.error('Error fetching historical data:', error);
    }

    // Prepare data for AI analysis
    const dataForAI = {
      currentStock: currentStock || 100,
      category: category,
      historicalTrends: historicalBags?.map(bag => ({
        date: bag.created_at,
        itemsLeft: bag.items_left,
        originalPrice: bag.original_price,
        finalPrice: bag.sale_price,
        sold: 10 - bag.items_left // Estimated sold items
      })) || [],
      dayOfWeek: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
      season: getSeason()
    };

    // Get AI predictions
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
            content: `You are an AI waste prediction system for Walmart stores. Analyze current inventory and historical patterns to predict:
            1. How many items will likely go unsold
            2. Optimal pricing strategy to minimize waste
            3. Suggested discount timing
            4. Risk level (low/medium/high) for food waste
            
            Consider factors like:
            - Day of week patterns
            - Seasonal trends
            - Category-specific behaviors (perishables vs non-perishables)
            - Historical performance
            
            Return JSON with: wasteRisk, predictedUnsold, suggestedDiscount, optimalTiming, reasoning`
          },
          {
            role: 'user',
            content: `Analyze this data: ${JSON.stringify(dataForAI)}`
          }
        ],
        temperature: 0.3,
        max_tokens: 400
      }),
    });

    const aiData = await response.json();
    const prediction = JSON.parse(aiData.choices[0].message.content);

    // Store prediction for future analysis
    await supabase
      .from('waste_predictions')
      .insert({
        store_id: storeId,
        category: category,
        predicted_waste: prediction.predictedUnsold,
        confidence_score: 0.85,
        suggested_discount: prediction.suggestedDiscount,
        risk_level: prediction.wasteRisk
      })
      .select()
      .single();

    return new Response(JSON.stringify(prediction), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in waste-predictor function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      wasteRisk: 'medium',
      predictedUnsold: 5,
      suggestedDiscount: 30,
      optimalTiming: '2 hours before closing',
      reasoning: 'Unable to analyze due to error, using default values'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function getSeason() {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'Spring';
  if (month >= 5 && month <= 7) return 'Summer';
  if (month >= 8 && month <= 10) return 'Autumn';
  return 'Winter';
}
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

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
    const { message, conversationHistory = [] } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // System prompt for EcoChat - focused on food waste, sustainability, and Surplus Saver
    const systemPrompt = `You are EcoChat, a friendly and knowledgeable AI assistant for Walmart's Surplus Saver app. Your role is to help users with:

1. Food waste reduction tips and strategies
2. Information about surplus food and sustainability
3. How to use the Surplus Saver app effectively
4. Environmental impact of food waste
5. Cooking tips for surplus ingredients
6. General eco-friendly living advice

Key facts about Surplus Saver:
- It's Walmart's initiative to reduce food waste
- Users can buy discounted "surprise bags" of surplus food
- The app shows real-time surplus items from nearby Walmart stores
- Customers save money while helping the environment
- AI recommendations suggest items based on preferences and weather
- The app tracks impact (meals saved, CO₂ reduced, money saved)

Be helpful, encouraging, and always relate advice back to sustainability and food waste reduction. Use a warm, friendly tone and include relevant emojis. Keep responses concise but informative.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
        stream: false
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;

    console.log('EcoChat response generated successfully');

    return new Response(
      JSON.stringify({ 
        message: aiMessage,
        conversationId: crypto.randomUUID()
      }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in EcoChat function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate response',
        details: error.message 
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
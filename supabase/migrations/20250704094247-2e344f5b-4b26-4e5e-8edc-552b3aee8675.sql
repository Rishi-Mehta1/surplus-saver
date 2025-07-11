-- Create profiles table for user authentication
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Create stores table
CREATE TABLE public.stores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  phone TEXT,
  rating DECIMAL(3, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for stores (public access for reading)
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Stores are viewable by everyone" 
ON public.stores 
FOR SELECT 
USING (true);

-- Create surplus_bags table for real-time data
CREATE TABLE public.surplus_bags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  original_price DECIMAL(10, 2) NOT NULL,
  sale_price DECIMAL(10, 2) NOT NULL,
  pickup_start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  pickup_end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  items_left INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.surplus_bags ENABLE ROW LEVEL SECURITY;

-- Create policies for surplus_bags
CREATE POLICY "Surplus bags are viewable by everyone" 
ON public.surplus_bags 
FOR SELECT 
USING (true);

-- Create reservations table
CREATE TABLE public.reservations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  surplus_bag_id UUID NOT NULL REFERENCES public.surplus_bags(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  total_price DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  pickup_code TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Create policies for reservations
CREATE POLICY "Users can view their own reservations" 
ON public.reservations 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own reservations" 
ON public.reservations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_surplus_bags_updated_at
  BEFORE UPDATE ON public.surplus_bags
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable realtime for tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.surplus_bags;
ALTER PUBLICATION supabase_realtime ADD TABLE public.reservations;

-- Set replica identity for realtime
ALTER TABLE public.surplus_bags REPLICA IDENTITY FULL;
ALTER TABLE public.reservations REPLICA IDENTITY FULL;

-- Insert sample stores
INSERT INTO public.stores (name, address, latitude, longitude, phone, rating) VALUES
('Walmart Supercenter - Mumbai Central', 'Dr. Ambedkar Road, Mumbai Central, Mumbai, Maharashtra 400011', 19.0176, 72.8562, '+91 22 2345 6789', 4.5),
('Walmart Neighborhood Market - Pune', 'FC Road, Pune, Maharashtra 411005', 18.5204, 73.8567, '+91 20 2567 8901', 4.3),
('Walmart - Delhi Connaught Place', 'Connaught Place, New Delhi, Delhi 110001', 28.6292, 77.2075, '+91 11 2345 6789', 4.7),
('Walmart Supercenter - Bangalore Electronic City', 'Electronic City Phase 1, Bangalore, Karnataka 560100', 12.8456, 77.6603, '+91 80 2345 6789', 4.4);

-- Insert sample surplus bags
INSERT INTO public.surplus_bags (store_id, category, original_price, sale_price, pickup_start_time, pickup_end_time, items_left, image_url) VALUES
((SELECT id FROM public.stores WHERE name LIKE '%Mumbai Central%'), 'Bakery', 450.00, 150.00, now() + interval '2 hours', now() + interval '6 hours', 8, null),
((SELECT id FROM public.stores WHERE name LIKE '%Pune%'), 'Produce', 750.00, 200.00, now() + interval '1 hour', now() + interval '5 hours', 12, null),
((SELECT id FROM public.stores WHERE name LIKE '%Delhi%'), 'Dairy & Frozen', 680.00, 180.00, now() + interval '3 hours', now() + interval '7 hours', 6, null),
((SELECT id FROM public.stores WHERE name LIKE '%Bangalore%'), 'Deli & Prepared', 950.00, 280.00, now() + interval '1.5 hours', now() + interval '4 hours', 4, null);
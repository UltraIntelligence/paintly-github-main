-- Create main application tables for the instructor dashboard

-- 1. Locations table
CREATE TABLE IF NOT EXISTS public.locations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id TEXT NOT NULL,
  name TEXT NOT NULL,
  name_jp TEXT,
  street_address TEXT,
  street_address_jp TEXT,
  city TEXT,
  city_jp TEXT,
  postal_code TEXT,
  country TEXT DEFAULT 'Japan',
  public_phone TEXT,
  public_email TEXT,
  description TEXT,
  description_jp TEXT,
  map_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Staff/Instructors table
CREATE TABLE IF NOT EXISTS public.staff (
  user_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id TEXT NOT NULL,
  full_name_override TEXT,
  bio TEXT,
  bio_jp TEXT,
  photo_url TEXT,
  is_instructor BOOLEAN DEFAULT false,
  is_admin BOOLEAN DEFAULT false,
  is_location_manager BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Event categories table
CREATE TABLE IF NOT EXISTS public.event_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id TEXT NOT NULL,
  name TEXT NOT NULL,
  name_jp TEXT,
  description TEXT,
  description_jp TEXT,
  color_hex TEXT DEFAULT '#3B82F6',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Master event types table
CREATE TABLE IF NOT EXISTS public.master_event_types (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id TEXT NOT NULL,
  name TEXT NOT NULL,
  name_jp TEXT,
  description TEXT,
  description_jp TEXT,
  default_duration_minutes INTEGER DEFAULT 60,
  default_capacity INTEGER DEFAULT 10,
  default_price DECIMAL(10,2) DEFAULT 0.00,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Events table
CREATE TABLE IF NOT EXISTS public.events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id TEXT NOT NULL,
  master_event_type_id UUID REFERENCES public.master_event_types(id),
  event_category_id UUID REFERENCES public.event_categories(id),
  location_id UUID REFERENCES public.locations(id),
  instructor_id UUID REFERENCES public.staff(user_id),
  title TEXT NOT NULL,
  title_jp TEXT,
  description TEXT,
  description_jp TEXT,
  featured_image_url TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  capacity INTEGER NOT NULL DEFAULT 10,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  is_published BOOLEAN DEFAULT false,
  is_cancelled BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Event bookings table
CREATE TABLE IF NOT EXISTS public.event_bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  booking_status TEXT DEFAULT 'confirmed' CHECK (booking_status IN ('confirmed', 'cancelled', 'no_show', 'completed')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  booking_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.master_event_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_bookings ENABLE ROW LEVEL SECURITY;

-- Create basic policies (allow all for now - you can restrict later)
CREATE POLICY "Allow all operations on locations" ON public.locations FOR ALL USING (true);
CREATE POLICY "Allow all operations on staff" ON public.staff FOR ALL USING (true);
CREATE POLICY "Allow all operations on event_categories" ON public.event_categories FOR ALL USING (true);
CREATE POLICY "Allow all operations on master_event_types" ON public.master_event_types FOR ALL USING (true);
CREATE POLICY "Allow all operations on events" ON public.events FOR ALL USING (true);
CREATE POLICY "Allow all operations on event_bookings" ON public.event_bookings FOR ALL USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_events_start_time ON public.events(start_time);
CREATE INDEX IF NOT EXISTS idx_events_location_id ON public.events(location_id);
CREATE INDEX IF NOT EXISTS idx_events_instructor_id ON public.events(instructor_id);
CREATE INDEX IF NOT EXISTS idx_event_bookings_event_id ON public.event_bookings(event_id);
CREATE INDEX IF NOT EXISTS idx_staff_is_instructor ON public.staff(is_instructor) WHERE is_instructor = true;

-- Verify tables were created
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('locations', 'staff', 'event_categories', 'master_event_types', 'events', 'event_bookings')
ORDER BY table_name;

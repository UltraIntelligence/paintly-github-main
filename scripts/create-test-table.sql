-- Create a simple test table for connection testing
CREATE TABLE IF NOT EXISTS public.test (
  id SERIAL PRIMARY KEY,
  message TEXT DEFAULT 'Connection successful',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert a test record
INSERT INTO public.test (message) VALUES ('Supabase connection test successful!');

-- Enable Row Level Security (optional, but recommended)
ALTER TABLE public.test ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow read access (adjust as needed for your security requirements)
CREATE POLICY "Allow read access to test table" ON public.test
  FOR SELECT USING (true);

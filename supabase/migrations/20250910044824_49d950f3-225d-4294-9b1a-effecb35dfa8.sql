-- Fix security issue: Personal Contact Information Exposed to Public
-- Solution: Create a public view with non-sensitive data and restrict access to the original table

-- 1. First, remove the existing public access policy for personal_info
DROP POLICY IF EXISTS "Allow public read access to personal_info" ON public.personal_info;

-- 2. Create a new policy that restricts access to the full personal_info table
-- Only authenticated users (you) can access the full table with sensitive data
CREATE POLICY "Restrict personal_info to authenticated users only" 
ON public.personal_info 
FOR SELECT 
TO authenticated 
USING (true);

-- 3. Create a public view that exposes only non-sensitive portfolio information
CREATE OR REPLACE VIEW public.portfolio_public_info AS
SELECT 
  id,
  name,
  image_url,
  role,
  bio,
  quote,
  location,
  github_url,
  linkedin_url,
  portfolio_url,
  resume_url,
  created_at,
  updated_at
FROM public.personal_info
-- Explicitly exclude sensitive fields: email, phone
LIMIT 1;

-- 4. Grant public access to the safe view
GRANT SELECT ON public.portfolio_public_info TO anon;
GRANT SELECT ON public.portfolio_public_info TO authenticated;

-- 5. Create a separate contact_requests table for handling contact form submissions
CREATE TABLE IF NOT EXISTS public.contact_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on contact_requests
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit contact requests (INSERT only)
CREATE POLICY "Allow public contact form submissions" 
ON public.contact_requests 
FOR INSERT 
TO public 
WITH CHECK (true);

-- Only authenticated users can read contact requests
CREATE POLICY "Authenticated users can read contact requests" 
ON public.contact_requests 
FOR SELECT 
TO authenticated 
USING (true);

-- Add update timestamp trigger for contact_requests
CREATE OR REPLACE FUNCTION public.update_contact_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_contact_requests_updated_at
  BEFORE UPDATE ON public.contact_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_contact_requests_updated_at();
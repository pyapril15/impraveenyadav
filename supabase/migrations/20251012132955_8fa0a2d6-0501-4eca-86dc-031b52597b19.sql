-- Enable anyone to submit contact requests
CREATE POLICY "Anyone can submit contact requests"
ON public.contact_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
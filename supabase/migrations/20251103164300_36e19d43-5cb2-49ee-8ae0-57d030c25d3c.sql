-- Fix adoption request status manipulation vulnerability
-- Drop the overly permissive update policy
DROP POLICY IF EXISTS "Users can update their own adoption requests" ON public.adoption_requests;

-- Create separate policies for applicants and pet uploaders
-- Applicants can only update their contact information, not status
CREATE POLICY "Applicants can update contact info"
ON public.adoption_requests
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (
  auth.uid() = user_id AND
  status = (SELECT status FROM public.adoption_requests WHERE id = adoption_requests.id)
);

-- Pet uploaders can update all fields including status
CREATE POLICY "Pet uploaders can update adoption requests"
ON public.adoption_requests
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.pets
    WHERE pets.id = adoption_requests.pet_id
    AND pets.uploaded_by = auth.uid()
  )
);
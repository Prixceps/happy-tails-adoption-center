-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create pets table
CREATE TABLE public.pets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  breed TEXT NOT NULL,
  age TEXT NOT NULL,
  gender TEXT NOT NULL,
  size TEXT NOT NULL,
  description TEXT,
  images TEXT[] NOT NULL DEFAULT '{}',
  temperament TEXT[] DEFAULT '{}',
  health_status TEXT,
  is_available BOOLEAN DEFAULT true,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS on pets
ALTER TABLE public.pets ENABLE ROW LEVEL SECURITY;

-- Pets policies - everyone can view available pets
CREATE POLICY "Anyone can view available pets"
  ON public.pets FOR SELECT
  USING (is_available = true);

CREATE POLICY "Authenticated users can view all pets"
  ON public.pets FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can upload pets"
  ON public.pets FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Users can update their own uploaded pets"
  ON public.pets FOR UPDATE
  TO authenticated
  USING (auth.uid() = uploaded_by);

CREATE POLICY "Users can delete their own uploaded pets"
  ON public.pets FOR DELETE
  TO authenticated
  USING (auth.uid() = uploaded_by);

-- Create adoption_requests table
CREATE TABLE public.adoption_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID REFERENCES public.pets(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  requester_name TEXT NOT NULL,
  requester_email TEXT NOT NULL,
  requester_phone TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS on adoption_requests
ALTER TABLE public.adoption_requests ENABLE ROW LEVEL SECURITY;

-- Adoption requests policies
CREATE POLICY "Users can view their own adoption requests"
  ON public.adoption_requests FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create adoption requests"
  ON public.adoption_requests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own adoption requests"
  ON public.adoption_requests FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Pet uploaders can view requests for their pets
CREATE POLICY "Pet uploaders can view requests for their pets"
  ON public.adoption_requests FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.pets
      WHERE pets.id = adoption_requests.pet_id
      AND pets.uploaded_by = auth.uid()
    )
  );

-- Create trigger function for updating updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pets_updated_at
  BEFORE UPDATE ON public.pets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_adoption_requests_updated_at
  BEFORE UPDATE ON public.adoption_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
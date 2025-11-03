export interface Pet {
  id: string;
  name: string;
  age: string;
  breed: string;
  gender: string;
  type: string;
  size: string;
  description: string | null;
  images: string[];
  temperament: string[] | null;
  health_status: string | null;
  is_available?: boolean;
  uploaded_by?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface AdoptionRequest {
  id: string;
  pet_id: string;
  user_id: string | null;
  requester_name: string;
  requester_email: string;
  requester_phone: string | null;
  message: string | null;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}
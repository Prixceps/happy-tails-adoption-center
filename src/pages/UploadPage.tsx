import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Session } from "@supabase/supabase-js";

const UploadPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    breed: "",
    type: "dog",
    gender: "male",
    size: "medium",
    description: "",
  });
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (!session) {
          navigate("/auth");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to upload a pet.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (!imageUrl) {
      toast({
        title: "Image Required",
        description: "Please provide an image URL for the pet.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("pets").insert({
        name: formData.name,
        age: formData.age,
        breed: formData.breed,
        type: formData.type,
        gender: formData.gender,
        size: formData.size,
        description: formData.description,
        images: [imageUrl],
        uploaded_by: session.user.id,
        is_available: true,
      });

      if (error) throw error;

      toast({
        title: "Pet Added Successfully!",
        description: `${formData.name} has been added to our adoption list.`,
      });

      // Reset form
      setFormData({
        name: "",
        age: "",
        breed: "",
        type: "dog",
        gender: "male",
        size: "medium",
        description: "",
      });
      setImageUrl("");

      setTimeout(() => navigate("/adoption"), 1500);
    } catch (error: any) {
      console.error("Error uploading pet:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to upload pet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Upload a Pet for Adoption
            </h1>
            <p className="text-lg text-gray-600">
              Add a new cat or dog to our adoption database. Please provide accurate information
              to help them find their perfect home.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Pet Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter pet name"
                  />
                </div>

                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                    Age *
                  </label>
                  <Input
                    id="age"
                    name="age"
                    type="text"
                    required
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="e.g., 2 years, 6 months"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    Pet Type *
                  </label>
                  <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dog">Dog</SelectItem>
                      <SelectItem value="cat">Cat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                    Gender *
                  </label>
                  <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                    Size *
                  </label>
                  <Select value={formData.size} onValueChange={(value) => handleSelectChange("size", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label htmlFor="breed" className="block text-sm font-medium text-gray-700 mb-1">
                  Breed *
                </label>
                <Input
                  id="breed"
                  name="breed"
                  type="text"
                  required
                  value={formData.breed}
                  onChange={handleChange}
                  placeholder="e.g., Labrador, Siamese"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <Textarea
                  id="description"
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell us about this pet's personality, habits, and needs"
                  rows={4}
                />
              </div>

              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Pet Image URL *
                </label>
                <Input
                  id="imageUrl"
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/pet-image.jpg"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter the URL of the pet's image
                </p>
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 hover:bg-indigo-700">
                {isSubmitting ? "Uploading..." : "Upload Pet"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
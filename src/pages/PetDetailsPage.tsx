import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { petData } from "@/data/petData";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import emailjs from '@emailjs/browser';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ChevronLeft, Mail, Phone } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

// EmailJS constants
const EMAILJS_SERVICE_ID = "service_l5whcri"; // Replace with your service ID
const EMAILJS_TEMPLATE_ID = "template_9rmrpsv"; // Replace with your template ID
const EMAILJS_PUBLIC_KEY = "xKd0QS_pQRxf677Gy"; // Replace with your public key

const PetDetailsPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const pet = petData.find(p => p.id === Number(id));
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });
  
  if (!pet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Pet Not Found</h1>
          <p className="mb-6">Sorry, we couldn't find the pet you're looking for.</p>
          <Button asChild>
            <Link to="/adoption">Browse All Pets</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Prepare the email template parameters
      const templateParams = {
        to_email: data.email,
        to_name: data.name,
        from_name: "Paws & Purrs Adoption Center",
        pet_name: pet.name,
        pet_type: pet.type,
        pet_breed: pet.breed,
        message: data.message || "No additional message provided",
        contact_phone: data.phone
      };

      // Send the email using EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log("Email sent successfully:", response);
      
      toast({
        title: "Adoption request sent!",
        description: `Thank you for your interest in adopting ${pet.name}. A confirmation has been sent to your email.`,
      });
      
      form.reset();
      
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: "There was an issue processing your request. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Button 
          variant="outline" 
          asChild 
          className="mb-8 flex items-center gap-2"
        >
          <Link to="/adoption">
            <ChevronLeft className="h-4 w-4" />
            Back to all pets
          </Link>
        </Button>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <AspectRatio ratio={4/3}>
                <img 
                  src={pet.image} 
                  alt={pet.name} 
                  className="w-full h-full object-cover" 
                />
              </AspectRatio>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="aspect-square bg-white rounded-md shadow-sm overflow-hidden">
                <img 
                  src={pet.image} 
                  alt={`${pet.name} thumbnail`} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="aspect-square bg-white rounded-md shadow-sm overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1466921009504-428748e9536a"
                  alt={`${pet.name} playing`} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="aspect-square bg-white rounded-md shadow-sm overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1605369179590-014a88d4560e"
                  alt={`${pet.name} closeup`} 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">{pet.name}</h1>
                  <p className="text-lg text-gray-600">{pet.breed}</p>
                </div>
                <span className={`inline-block py-1 px-3 rounded-full text-sm font-semibold ${
                  pet.type === 'dog' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                }`}>
                  {pet.type === 'dog' ? 'Dog' : 'Cat'}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="bg-gray-50 p-3 rounded-md">
                  <span className="text-gray-500">Age</span>
                  <p className="font-medium">{pet.age}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <span className="text-gray-500">Gender</span>
                  <p className="font-medium">{pet.gender === 'male' ? 'Male' : 'Female'}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">About {pet.name}</h2>
                <p className="text-gray-700">{pet.description}</p>
              </div>
              
              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-4">Shelter Contact</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <span>(123) 456-7890</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <span>info@pawsandpurrs.com</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Interested in adopting {pet.name}?</CardTitle>
                <CardDescription>
                  Fill out this form and we'll get back to you shortly. A confirmation email will be sent to your address.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            We'll send adoption details to this email.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="(123) 456-7890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Message (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us why you'd be a good match for this pet"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-indigo-600 hover:bg-indigo-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : `Submit Adoption Request for ${pet.name}`}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetailsPage;

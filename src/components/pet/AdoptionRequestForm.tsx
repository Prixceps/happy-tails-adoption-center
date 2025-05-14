
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card,
  CardContent,
  CardDescription,
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

// EmailJS constants
const EMAILJS_SERVICE_ID = "service_l5whcri"; // Replace with your service ID
const EMAILJS_TEMPLATE_ID = "template_9rmrpsv"; // Replace with your template ID
const EMAILJS_PUBLIC_KEY = "xKd0QS_pQRxf677Gy"; // Replace with your public key

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

interface AdoptionRequestFormProps {
  petName: string;
  petType: string;
  petBreed: string;
}

const AdoptionRequestForm = ({ petName, petType, petBreed }: AdoptionRequestFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });
  
  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Prepare the email template parameters
      const templateParams = {
        to_email: data.email,
        to_name: data.name,
        from_name: "Paws & Purrs Adoption Center",
        pet_name: petName,
        pet_type: petType,
        pet_breed: petBreed,
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
        description: `Thank you for your interest in adopting ${petName}. A confirmation has been sent to your email.`,
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
    <Card>
      <CardHeader>
        <CardTitle>Interested in adopting {petName}?</CardTitle>
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
              {isSubmitting ? "Submitting..." : `Submit Adoption Request for ${petName}`}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AdoptionRequestForm;

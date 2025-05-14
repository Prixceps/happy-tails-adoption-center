
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { petData } from "@/data/petData";
import { ChevronLeft } from "lucide-react";

// Import our new components
import PetImageGallery from "@/components/pet/PetImageGallery";
import PetInfoCard from "@/components/pet/PetInfoCard";
import AdoptionRequestForm from "@/components/pet/AdoptionRequestForm";
import PetNotFound from "@/components/pet/PetNotFound";

const PetDetailsPage = () => {
  const { id } = useParams();
  const pet = petData.find(p => p.id === Number(id));
  
  if (!pet) {
    return <PetNotFound />;
  }

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
            <PetImageGallery mainImage={pet.image} petName={pet.name} />
          </div>
          
          <div>
            <PetInfoCard pet={pet} />
            <AdoptionRequestForm 
              petName={pet.name}
              petType={pet.type}
              petBreed={pet.breed}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetailsPage;

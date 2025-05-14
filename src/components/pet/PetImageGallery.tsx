
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface PetImageGalleryProps {
  mainImage: string;
  petName: string;
}

const PetImageGallery = ({ mainImage, petName }: PetImageGalleryProps) => {
  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <AspectRatio ratio={4/3}>
          <img 
            src={mainImage} 
            alt={petName} 
            className="w-full h-full object-cover" 
          />
        </AspectRatio>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        <div className="aspect-square bg-white rounded-md shadow-sm overflow-hidden">
          <img 
            src={mainImage} 
            alt={`${petName} thumbnail`} 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="aspect-square bg-white rounded-md shadow-sm overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1466921009504-428748e9536a"
            alt={`${petName} playing`} 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="aspect-square bg-white rounded-md shadow-sm overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1605369179590-014a88d4560e"
            alt={`${petName} closeup`} 
            className="w-full h-full object-cover" 
          />
        </div>
      </div>
    </>
  );
};

export default PetImageGallery;

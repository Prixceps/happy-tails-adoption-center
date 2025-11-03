import { AspectRatio } from "@/components/ui/aspect-ratio";

interface PetImageGalleryProps {
  images: string[];
  petName: string;
}

const PetImageGallery = ({ images, petName }: PetImageGalleryProps) => {
  const mainImage = images && images.length > 0 ? images[0] : "/placeholder.svg";
  
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
        {images.slice(0, 3).map((image, index) => (
          <div key={index} className="aspect-square bg-white rounded-md shadow-sm overflow-hidden">
            <img 
              src={image} 
              alt={`${petName} ${index + 1}`} 
              className="w-full h-full object-cover" 
            />
          </div>
        ))}
        {images.length === 0 && (
          <div className="aspect-square bg-white rounded-md shadow-sm overflow-hidden">
            <img 
              src="/placeholder.svg" 
              alt={petName} 
              className="w-full h-full object-cover" 
            />
          </div>
        )}
      </div>
    </>
  );
};

export default PetImageGallery;
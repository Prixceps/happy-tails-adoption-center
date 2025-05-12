
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Pet } from "@/types";

interface PetCardProps {
  pet: Pet;
}

const PetCard = ({ pet }: PetCardProps) => {
  const { id, name, age, breed, gender, type, description, image } = pet;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className={`inline-block py-1 px-2 rounded-full text-xs font-semibold ${
            type === 'dog' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
          }`}>
            {type === 'dog' ? 'Dog' : 'Cat'}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{name}</h3>
        <div className="text-sm text-gray-500 mb-2">{breed} · {age}</div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-2 text-sm">
            <span className={`${gender === 'male' ? 'text-blue-600' : 'text-pink-600'}`}>
              {gender === 'male' ? 'Male' : 'Female'}
            </span>
          </div>
          
          <Button asChild size="sm" className="bg-indigo-600 hover:bg-indigo-700">
            <Link to={`/adoption/${id}`}>
              View Details
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PetCard;


import { Pet } from "@/types";
import { Phone, Mail } from "lucide-react";

interface PetInfoCardProps {
  pet: Pet;
}

const PetInfoCard = ({ pet }: PetInfoCardProps) => {
  return (
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
  );
};

export default PetInfoCard;

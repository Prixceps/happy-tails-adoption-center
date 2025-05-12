
import { useState, useEffect } from "react";
import { petData } from "@/data/petData";
import PetCard from "@/components/PetCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdoptionPage = () => {
  const [pets, setPets] = useState(petData);
  const [filters, setFilters] = useState({
    type: "all",
    search: "",
  });

  useEffect(() => {
    const filteredPets = petData.filter((pet) => {
      // Filter by type
      if (filters.type !== "all" && pet.type !== filters.type) {
        return false;
      }
      
      // Filter by search term
      if (
        filters.search &&
        !pet.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !pet.breed.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }
      
      return true;
    });
    
    setPets(filteredPets);
  }, [filters]);
  
  const resetFilters = () => {
    setFilters({
      type: "all",
      search: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Pets Available for Adoption
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our wonderful selection of cats and dogs looking for their forever homes.
            Use the filters below to find your perfect match.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pet Type
              </label>
              <Select
                value={filters.type}
                onValueChange={(value) => setFilters({...filters, type: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Pets</SelectItem>
                  <SelectItem value="dog">Dogs</SelectItem>
                  <SelectItem value="cat">Cats</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <Input
                type="text"
                placeholder="Search by name or breed"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
            </div>
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={resetFilters}
                className="w-full"
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </div>
        
        {pets.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-medium text-gray-700 mb-2">No pets found</h3>
            <p className="text-gray-500">Try adjusting your filters or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdoptionPage;

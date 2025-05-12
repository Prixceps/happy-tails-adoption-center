
import { useState } from "react";
import PetCard from "./PetCard";
import { Button } from "@/components/ui/button";
import { petData } from "@/data/petData";

const FeaturedPets = () => {
  // Get 4 featured pets (2 dogs and 2 cats)
  const featuredPets = [
    ...petData.filter(pet => pet.type === "dog").slice(0, 2),
    ...petData.filter(pet => pet.type === "cat").slice(0, 2)
  ];
  
  const [activeTab, setActiveTab] = useState<'all' | 'dogs' | 'cats'>('all');
  
  const filteredPets = activeTab === 'all' 
    ? featuredPets
    : featuredPets.filter(pet => 
        activeTab === 'dogs' ? pet.type === 'dog' : pet.type === 'cat'
      );

  return (
    <div>
      <div className="flex justify-center space-x-4 mb-8">
        <Button
          variant={activeTab === 'all' ? 'default' : 'outline'}
          onClick={() => setActiveTab('all')}
          className={activeTab === 'all' ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
        >
          All Pets
        </Button>
        <Button
          variant={activeTab === 'dogs' ? 'default' : 'outline'}
          onClick={() => setActiveTab('dogs')}
          className={activeTab === 'dogs' ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
        >
          Dogs
        </Button>
        <Button
          variant={activeTab === 'cats' ? 'default' : 'outline'}
          onClick={() => setActiveTab('cats')}
          className={activeTab === 'cats' ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
        >
          Cats
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPets.map(pet => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedPets;

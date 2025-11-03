import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
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
import { Skeleton } from "@/components/ui/skeleton";

interface Pet {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: string;
  gender: string;
  size: string;
  description: string | null;
  images: string[];
  temperament: string[] | null;
  health_status: string | null;
}

const AdoptionPage = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: "all",
    search: "",
  });

  useEffect(() => {
    fetchPets();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, pets]);

  const fetchPets = async () => {
    try {
      const { data, error } = await supabase
        .from("pets")
        .select("*")
        .eq("is_available", true)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setPets(data || []);
    } catch (error) {
      console.error("Error fetching pets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = pets;

    // Filter by type
    if (filters.type !== "all") {
      filtered = filtered.filter((pet) => pet.type === filters.type);
    }

    // Filter by search term
    if (filters.search) {
      filtered = filtered.filter(
        (pet) =>
          pet.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          pet.breed.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setFilteredPets(filtered);
  };

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
                onValueChange={(value) => setFilters({ ...filters, type: value })}
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
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
            <div className="flex items-end">
              <Button variant="outline" onClick={resetFilters} className="w-full">
                Reset Filters
              </Button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredPets.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-medium text-gray-700 mb-2">No pets found</h3>
            <p className="text-gray-500">
              {pets.length === 0
                ? "No pets are currently available for adoption."
                : "Try adjusting your filters or search term."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdoptionPage;
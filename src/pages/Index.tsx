
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FeaturedPets from "@/components/FeaturedPets";
import Hero from "@/components/Hero";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Find Your New Best Friend</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our selection of adorable cats and dogs who are looking for their forever homes.
            Each one has a unique personality and is ready to bring joy to your life.
          </p>
        </div>
        
        <FeaturedPets />
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Ready to meet them all?</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-6">
              <Link to="/adoption">See All Pets</Link>
            </Button>
            <Button asChild variant="outline" className="text-lg px-8 py-6">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-indigo-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">How Adoption Works</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold text-lg">Browse Available Pets</h3>
                    <p className="text-gray-600">Look through our selection of lovable cats and dogs looking for homes.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold text-lg">Submit an Application</h3>
                    <p className="text-gray-600">Fill out our adoption form and tell us about yourself.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-semibold text-lg">Meet Your Match</h3>
                    <p className="text-gray-600">Come visit and spend time with your potential new family member.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-semibold text-lg">Welcome Home</h3>
                    <p className="text-gray-600">Complete the adoption and bring your new pet to their forever home!</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1" 
                alt="Happy adopted pet" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

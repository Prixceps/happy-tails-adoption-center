
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PetNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Pet Not Found</h1>
        <p className="mb-6">Sorry, we couldn't find the pet you're looking for.</p>
        <Button asChild>
          <Link to="/adoption">Browse All Pets</Link>
        </Button>
      </div>
    </div>
  );
};

export default PetNotFound;


import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Menu, X } from "lucide-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <Link to="/" className="flex items-center space-x-3">
            <span className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
              <Home className="text-white" />
            </span>
            <span className="font-bold text-xl text-gray-800">Paws & Purrs</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium">Home</Link>
            <Link to="/adoption" className="text-gray-600 hover:text-indigo-600 font-medium">Adoption</Link>
            <Link to="/contact" className="text-gray-600 hover:text-indigo-600 font-medium">Contact</Link>
            <Button asChild variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50">
              <Link to="/upload">Upload Pet</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile navigation */}
        {isOpen && (
          <div className="md:hidden pt-2 pb-4 space-y-2">
            <Link 
              to="/" 
              className="block px-4 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/adoption" 
              className="block px-4 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded"
              onClick={() => setIsOpen(false)}
            >
              Adoption
            </Link>
            <Link 
              to="/contact" 
              className="block px-4 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link 
              to="/upload" 
              className="block px-4 py-2 text-indigo-600 font-medium hover:bg-indigo-50 rounded"
              onClick={() => setIsOpen(false)}
            >
              Upload Pet
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

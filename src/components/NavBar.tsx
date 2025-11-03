import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Menu, X, LogOut, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

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
            {session ? (
              <>
                <Button asChild variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                  <Link to="/upload">Upload Pet</Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button asChild variant="default" className="bg-indigo-600 hover:bg-indigo-700">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
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
            {session ? (
              <>
                <Link 
                  to="/upload" 
                  className="block px-4 py-2 text-indigo-600 font-medium hover:bg-indigo-50 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Upload Pet
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link 
                to="/auth" 
                className="block px-4 py-2 text-indigo-600 font-medium hover:bg-indigo-50 rounded"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
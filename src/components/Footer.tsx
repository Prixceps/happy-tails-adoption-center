
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Paws & Purrs</h3>
            <p className="text-gray-300">
              Finding loving homes for cats and dogs in need.
              Our mission is to connect wonderful pets with caring families.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/adoption" className="text-gray-300 hover:text-white">Adoption</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link>
              </li>
              <li>
                <Link to="/upload" className="text-gray-300 hover:text-white">Upload Pet</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <address className="text-gray-300 not-italic">
              <p>Prince Raj</p>
              <p>Pune, Maharashtra</p>
              <p className="mt-2">Email: prrj2026@gmail.com</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>© {year} Paws & Purrs Adoption Center. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const Header = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-serif font-bold text-white">
          Echoed Thoughts
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/explore" className="text-white/90 hover:text-white transition-colors">
            Explore
          </Link>
          
          <div className="relative">
            <button 
              className="flex items-center text-white/90 hover:text-white transition-colors"
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
            >
              Categories
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            
            {isCategoriesOpen && (
              <div className="absolute top-full mt-2 py-2 w-48 bg-black/80 backdrop-blur-md border border-white/10 rounded-md shadow-lg">
                <Link to="/category/creativity" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10">
                  Creativity
                </Link>
                <Link to="/category/psychology" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10">
                  Psychology
                </Link>
                <Link to="/category/digital-media" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10">
                  Digital Media
                </Link>
                <Link to="/category/philosophy" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10">
                  Philosophy
                </Link>
                <Link to="/category/technology" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10">
                  Technology
                </Link>
              </div>
            )}
          </div>
          
          <Link to="/about" className="text-white/90 hover:text-white transition-colors">
            About
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-white/90 hover:text-white transition-colors">
            Log in
          </Link>
          
          <Link to="/register" className="px-4 py-2 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors">
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;


import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, Github, Twitter, Instagram, Linkedin } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const Footer = () => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, this would connect to a newsletter service
    if (email && email.includes('@')) {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
        duration: 3000,
      });
      setEmail('');
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  return (
    <footer className="bg-black py-16 px-4 border-t border-white/10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand and info */}
          <div className="md:col-span-4">
            <h3 className="text-2xl font-serif font-bold text-white mb-4">
              Echoed Thoughts
            </h3>
            <p className="text-white/70 mb-6">
              A platform for thoughtful expression, where ideas resonate and stories matter.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-white" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="md:col-span-2">
            <h4 className="text-white font-medium mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/70 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-white/70 hover:text-white transition-colors">
                  Explore
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-white transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div className="md:col-span-2">
            <h4 className="text-white font-medium mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/category/creativity" className="text-white/70 hover:text-white transition-colors">
                  Creativity
                </Link>
              </li>
              <li>
                <Link to="/category/psychology" className="text-white/70 hover:text-white transition-colors">
                  Psychology
                </Link>
              </li>
              <li>
                <Link to="/category/digital-media" className="text-white/70 hover:text-white transition-colors">
                  Digital Media
                </Link>
              </li>
              <li>
                <Link to="/category/philosophy" className="text-white/70 hover:text-white transition-colors">
                  Philosophy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div className="md:col-span-2">
            <h4 className="text-white font-medium mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-white/70 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-white/70 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-white/70 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="md:col-span-2">
            <h4 className="text-white font-medium mb-4">Newsletter</h4>
            <p className="text-white/70 mb-4">
              Stay updated with our latest stories and platform features.
            </p>
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-l-md text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button 
                type="submit"
                className="px-3 py-2 bg-white text-black rounded-r-md hover:bg-white/90 transition-colors flex items-center justify-center"
                aria-label="Subscribe"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-white/50">
            © {new Date().getFullYear()} Echoed Thoughts. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

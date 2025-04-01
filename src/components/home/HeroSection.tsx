
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleBackground from '../three/ParticleBackground';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden">
      <ParticleBackground />
      
      <div className="container mx-auto text-center z-10 animate-float-up opacity-0" style={{ animationDelay: '0.3s' }}>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-6 text-white">
          Where Thoughts Echo<br />Through Minds
        </h1>
        <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-12">
          Share your voice in a space where ideas resonate and stories matter
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/register" 
            className="px-8 py-3 rounded-full bg-white text-black font-medium flex items-center hover:bg-white/90 transition-colors"
          >
            Start Writing <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link 
            to="/explore" 
            className="px-8 py-3 rounded-full bg-transparent border border-white/50 text-white font-medium hover:bg-white/10 transition-colors"
          >
            Explore Stories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

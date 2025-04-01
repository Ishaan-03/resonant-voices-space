
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ParticleBackground from "@/components/three/ParticleBackground";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <ParticleBackground />
        <div className="container mx-auto max-w-screen-xl relative z-10">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <AlertTriangle className="h-20 w-20 text-white/30 mb-6" />
            <h1 className="text-6xl font-serif font-bold mb-4">404</h1>
            <h2 className="text-2xl font-serif font-medium mb-6">Page Not Found</h2>
            <p className="text-white/70 max-w-lg mb-8">
              The page you are looking for doesn't exist or has been moved. Please check the URL or navigate back to the home page.
            </p>
            <Link 
              to="/" 
              className="px-6 py-3 rounded-full bg-white text-black font-medium flex items-center hover:bg-white/90 transition-colors"
            >
              <ArrowLeft className="mr-2 h-5 w-5" /> Return to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundPage;


import { UserPlus, Pen, Share2 } from 'lucide-react';

const HowItWorksSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black/80 to-black/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-white animate-float-up opacity-0" style={{ animationDelay: '0.3s' }}>
            How It Works
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto animate-float-up opacity-0" style={{ animationDelay: '0.4s' }}>
            Getting started with Echoed Thoughts is simple
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Step 1 */}
          <div className="relative animate-float-up opacity-0" style={{ animationDelay: '0.5s' }}>
            <div className="glass-card p-8 text-center h-full">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <UserPlus className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-4 text-white">Create an Account</h3>
              <p className="text-white/70">
                Sign up in seconds and customize your profile to reflect your unique voice and perspective.
              </p>
            </div>
            
            <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
              <div className="w-16 h-1 bg-white/20"></div>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="relative animate-float-up opacity-0" style={{ animationDelay: '0.6s' }}>
            <div className="glass-card p-8 text-center h-full">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Pen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-4 text-white">Compose Your Thoughts</h3>
              <p className="text-white/70">
                Use our powerful editor to create rich content with text, audio, video, and more.
              </p>
            </div>
            
            <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
              <div className="w-16 h-1 bg-white/20"></div>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="animate-float-up opacity-0" style={{ animationDelay: '0.7s' }}>
            <div className="glass-card p-8 text-center h-full">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Share2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-4 text-white">Publish and Connect</h3>
              <p className="text-white/70">
                Share your content with the world and engage with a community of thoughtful readers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

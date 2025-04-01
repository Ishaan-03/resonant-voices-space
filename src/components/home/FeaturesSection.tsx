
import { Mic, Users, Lightbulb, BarChart3 } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black/50 to-black/80">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-white animate-float-up opacity-0" style={{ animationDelay: '0.3s' }}>
            A Platform Built for Thoughtful Expression
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto animate-float-up opacity-0" style={{ animationDelay: '0.4s' }}>
            Everything you need to create, share, and engage with meaningful content
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="glass-card p-8 text-center animate-float-up opacity-0" style={{ animationDelay: '0.5s' }}>
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mic className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-serif font-bold mb-4 text-white">Amplify Your Voice</h3>
            <p className="text-white/70">
              Share your unique perspective through text, audio, and video content that resonates with readers around the world.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="glass-card p-8 text-center animate-float-up opacity-0" style={{ animationDelay: '0.6s' }}>
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-serif font-bold mb-4 text-white">Connect With Minds</h3>
            <p className="text-white/70">
              Join a vibrant community of thinkers, writers, and readers who engage with ideas that matter.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="glass-card p-8 text-center animate-float-up opacity-0" style={{ animationDelay: '0.7s' }}>
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lightbulb className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-serif font-bold mb-4 text-white">Create Without Limits</h3>
            <p className="text-white/70">
              Express yourself through rich multimedia content with our powerful yet intuitive creation tools.
            </p>
          </div>
          
          {/* Feature 4 */}
          <div className="glass-card p-8 text-center animate-float-up opacity-0" style={{ animationDelay: '0.8s' }}>
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-serif font-bold mb-4 text-white">Grow Your Audience</h3>
            <p className="text-white/70">
              Track your impact with detailed analytics and build a loyal following that values your perspective.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
